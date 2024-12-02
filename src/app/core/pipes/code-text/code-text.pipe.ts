import { Pipe, PipeTransform } from '@angular/core';
import { codeTextPattern } from '@utils/regex/utils.regex.validators';
import { CommonEnum } from '@enums/bases/base.enum';

@Pipe({
  name: 'codeText',
  standalone: true,
})
export class CodeTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Substituir o texto encontrado pela tag <code>
    return value.replace(codeTextPattern, CommonEnum.codeTag);
  }
}
