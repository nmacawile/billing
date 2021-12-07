interface DateRange {
  start_date: Date;
  end_date: Date;
}

export class DateHelpers {
  static getPrevious(date: Date): DateRange {
    const lastMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
    const lastMonth = lastMonthLastDate.getMonth();
    const lastYear = lastMonthLastDate.getFullYear();

    return {
      start_date: new Date(lastYear, lastMonth, 1),
      end_date: new Date(lastYear, lastMonth + 1, 0),
    };
  }

  static getNext(date: Date): DateRange {
    const start_date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const end_date = new Date(
      start_date.getFullYear(),
      start_date.getMonth() + 1,
      0,
    );
    return { start_date, end_date };
  }
}
