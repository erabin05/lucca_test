import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updatingDate'
})
export class UpdatingDatePipe implements PipeTransform {

  transform(dateString: string): string {
    if (dateString) {
    const date = new Date(dateString);
    const infos = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    const allDate = date.toLocaleDateString('fr', infos);
    return allDate;
    }
  }

}
