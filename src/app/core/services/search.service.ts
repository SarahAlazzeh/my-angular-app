import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'none';
export type FilterOption = string;

export interface SearchState {
  search: string;
  sort: SortOption;
  filter: FilterOption;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private sortSubject = new BehaviorSubject<SortOption>('none');
  private filterSubject = new BehaviorSubject<FilterOption>('all');
  
  search$ = this.searchSubject.asObservable();
  sort$ = this.sortSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  sendSearchProduct(value: string): void {
    this.searchSubject.next(value);
  }

  getSearchProduct(): Observable<string> {
    return this.search$;
  }

  setSort(sort: SortOption): void {
    this.sortSubject.next(sort);
  }

  getSort(): Observable<SortOption> {
    return this.sort$;
  }

  setFilter(filter: FilterOption): void {
    this.filterSubject.next(filter);
  }

  getFilter(): Observable<FilterOption> {
    return this.filter$;
  }

  clearSearch(): void {
    this.searchSubject.next('');
  }

  resetAll(): void {
    this.searchSubject.next('');
    this.sortSubject.next('none');
    this.filterSubject.next('all');
  }
}
