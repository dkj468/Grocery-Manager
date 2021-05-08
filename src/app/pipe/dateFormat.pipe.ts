import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateFormat",
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const datePipe = new DatePipe("en-US");
    value = datePipe.transform(value, "MMM-dd-yyyy");
    return value;
  }
}
