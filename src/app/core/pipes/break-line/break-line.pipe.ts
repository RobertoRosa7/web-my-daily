import { Pipe, PipeTransform } from '@angular/core';

/**
 * @see: https://medium.com/@thunderroid/angular-short-number-suffix-pipe-1k-2m-3b-dded4af82fb4
 */
@Pipe({
  name: 'breakline',
  standalone: true,
})
export class BreakLine implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return value.replaceAll('\n', '<br />');
  }
}
