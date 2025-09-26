import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.interface';

@Pipe({
  name: 'searchPipe',
  pure: false,
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchValue: string): Product[] {
    if (!searchValue || !searchValue.trim()) {
      return products;
    }
    
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      (product.name && product.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }
}
