import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { SearchService } from '../../../core/services/search.service';
import { Subscription } from 'rxjs';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'none';
export type FilterOption = 'all' | string;

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() pageType: 'shop' | 'recipe' = 'shop';
  @Input() filterOptions: string[] = [];
  @Input() placeholder: string = 'nav.search.placeholder';
  @Input() initialFilter: string = 'all';
  
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<SortOption>();
  @Output() filterChange = new EventEmitter<string>();

  searchValue: string = '';
  selectedSort: SortOption = 'none';
  selectedFilter: string = 'all';

  private searchSubscription?: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    if (this.initialFilter && this.initialFilter !== 'all') {
      this.selectedFilter = this.initialFilter;
      this.onFilterChange();
    }

    this.searchSubscription = this.searchService.getSearchProduct().subscribe(value => {
      if (value) {
        this.searchValue = value;
        this.onSearchChange();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchChange(): void {
    this.searchService.sendSearchProduct(this.searchValue);
    this.searchChange.emit(this.searchValue);
  }

  onSortChange(): void {
    this.searchService.setSort(this.selectedSort);
    this.sortChange.emit(this.selectedSort);
  }

  onFilterChange(): void {
    this.searchService.setFilter(this.selectedFilter);
    this.filterChange.emit(this.selectedFilter);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.onSearchChange();
  }

  getSortOptions(): { value: SortOption; label: string }[] {
    const baseOptions = [
      { value: 'none' as SortOption, label: 'search.sort.none' },
      { value: 'name-asc' as SortOption, label: 'search.sort.nameAsc' },
      { value: 'name-desc' as SortOption, label: 'search.sort.nameDesc' },
      { value: 'price-asc' as SortOption, label: 'search.sort.priceAsc' },
      { value: 'price-desc' as SortOption, label: 'search.sort.priceDesc' }
    ];

    return baseOptions;
  }
}
