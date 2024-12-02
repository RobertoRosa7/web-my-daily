import { Pipe, PipeTransform } from '@angular/core';
import { TimeAgoMessages } from '../../enums/bases/base.enum';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number | undefined, showExactDate: boolean = false): string {
    if (!value) return '';

    const timePattern = '{time}';

    const inputDate = new Date(value);
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInYears = Math.floor(diffInDays / 365);

    // Objeto literal com callbacks e uso do enum
    const timeMap: { [key: string]: () => string } = {
      years: () => TimeAgoMessages.YEARS.replace(timePattern, diffInYears.toString()),
      weeks: () => TimeAgoMessages.WEEKS.replace(timePattern, diffInWeeks.toString()),
      days: () => TimeAgoMessages.DAYS.replace(timePattern, diffInDays.toString()),
      hours: () => TimeAgoMessages.HOURS.replace(timePattern, diffInHours.toString()),
      minutes: () => TimeAgoMessages.MINUTES.replace(timePattern, diffInMinutes.toString()),
      now: () => TimeAgoMessages.NOW,
    };

    // Determinar a chave do mapeamento
    const key =
      diffInYears > 0
        ? 'years'
        : diffInWeeks > 0
        ? 'weeks'
        : diffInDays > 0
        ? 'days'
        : diffInHours > 0
        ? 'hours'
        : diffInMinutes > 0
        ? 'minutes'
        : 'now';

    // Obter o resultado da função mapeada
    let result = timeMap[key]();

    // Adicionar a data exata se solicitado
    if (showExactDate) {
      const day = inputDate.getDate().toString().padStart(2, '0');
      const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
      const year = inputDate.getFullYear();
      result += ` (desde ${day}-${month}-${year})`;
    }

    return result;
  }
}
