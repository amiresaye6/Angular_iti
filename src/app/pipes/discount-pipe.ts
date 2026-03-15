import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, discount: number = 10): number {
    if (discount > 100) {
      throw new Error('discount can not be more than 100%');
    }
    if (discount > 0 && value > 0) {
      return value - (value * (discount / 100));
    }
    return value;
  }
}
