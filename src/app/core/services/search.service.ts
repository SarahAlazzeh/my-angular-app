import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();
  sendSearchProduct( value : string ){
    this.searchSubject.next(value);
  }

  getSearchProduct() :Observable<string> {
    return this.search$
  }

  clearSearch() :void {
    this.searchSubject.next("")
  }
}
