import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../productInterface/iproduct';

@Pipe({
  name: 'searchPipe',
  pure: false,
})
export class SearchPipe implements PipeTransform {

  transform(product: Iproduct[], searchValue: string): Iproduct[] {
    return product.filter((product)=>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

}
