import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStampToDate'
})
export class TimeStampToDatePipe implements PipeTransform {

  transform(value:number, ...args: unknown[]): unknown 
  {
    return new Date(value).toDateString();
  }

}
