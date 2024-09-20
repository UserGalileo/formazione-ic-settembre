import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'exponential',
  pure: true
})
export class ExponentialPipe implements PipeTransform {

  transform(value: number, exponent = 1) {
    return Math.pow(value, exponent);
  }
}
