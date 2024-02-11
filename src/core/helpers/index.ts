import { format } from "date-fns";

export class DateTime {
  static now() {
    return new Date();
  }

  static formatISO(date?: string): string;
  static formatISO(date: Date): string;
  static formatISO(date: string | Date): string {
    if (!date) return format(DateTime.now(), "yyyy-MM-dd");
    return format(date, "yyyy-MM-dd");
  }
}
