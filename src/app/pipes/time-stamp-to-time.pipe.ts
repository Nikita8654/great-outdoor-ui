import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStampToTime'
})
export class TimeStampToTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Date(value).getHours()+":"+new Date(value).getMinutes();
  }

}
