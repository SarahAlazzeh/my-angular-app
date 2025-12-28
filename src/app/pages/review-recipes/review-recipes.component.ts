import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RecipeService, PendingRecipe } from '../../core/services/recipe.service';
import { UserdataService } from '../../core/services/userData.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-review-recipes',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TranslatePipe],
  templateUrl: './review-recipes.component.html',
  styleUrl: './review-recipes.component.css'
})
export class ReviewRecipesComponent implements OnInit {
  private recipeService = inject(RecipeService);
  private userDataService = inject(UserdataService);
  private router = inject(Router);
  private translationService = inject(TranslationService);

  pendingRecipes = signal<PendingRecipe[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  isAdmin = signal(false);

  ngOnInit() {
    // The guard already handles admin check, so we can trust it here
    // Just check admin status for UI purposes
    const currentAdminStatus = this.userDataService.isLooginAdmin();
    this.isAdmin.set(currentAdminStatus);
    
    // Load recipes if admin
    if (currentAdminStatus) {
      this.loadPendingRecipes();
    }
    
    // Subscribe to changes in admin status
    this.userDataService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin.set(isAdmin);
      if (isAdmin && this.pendingRecipes().length === 0) {
        // Reload if admin status changes to true
        this.loadPendingRecipes();
      }
    });
  }

  async loadPendingRecipes() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const recipes = await this.recipeService.getPendingRecipes();
      this.pendingRecipes.set(recipes);
    } catch (error: any) {
      console.error('Error loading pending recipes:', error);
      this.errorMessage.set('Failed to load pending recipes. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async approveRecipe(recipeId: string) {
    const confirmMessage = this.translationService.translate('reviewRecipes.approveConfirm');
    if (!confirm(confirmMessage)) {
      return;
    }

    this.isLoading.set(true);
    try {
      const reviewerId = this.userDataService.getCurrentUserId();
      if (!reviewerId) {
        throw new Error('User not authenticated');
      }

      await this.recipeService.approveRecipe(recipeId, reviewerId);
      await this.loadPendingRecipes(); // Reload list
    } catch (error: any) {
      console.error('Error approving recipe:', error);
      const errorMessage = this.translationService.translate('reviewRecipes.approveError');
      alert(errorMessage);
    } finally {
      this.isLoading.set(false);
    }
  }

  async rejectRecipe(recipeId: string) {
    const confirmMessage = this.translationService.translate('reviewRecipes.rejectConfirm');
    if (!confirm(confirmMessage)) {
      return;
    }

    this.isLoading.set(true);
    try {
      const reviewerId = this.userDataService.getCurrentUserId();
      if (!reviewerId) {
        throw new Error('User not authenticated');
      }

      await this.recipeService.rejectRecipe(recipeId, reviewerId);
      await this.loadPendingRecipes(); // Reload list
    } catch (error: any) {
      console.error('Error rejecting recipe:', error);
      const errorMessage = this.translationService.translate('reviewRecipes.rejectError');
      alert(errorMessage);
    } finally {
      this.isLoading.set(false);
    }
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }
}

