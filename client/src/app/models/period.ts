import { MongoidId } from './mongoid-id';
import { PeriodDepartment, PeriodDepartmentParams } from './period-department';

interface PeriodPartials {
  days_off?: Date[];
  start_date: Date;
  end_date: Date;
}

export interface PeriodParams extends PeriodPartials {
  period_departments?: PeriodDepartmentParams[];
}

export interface Period extends PeriodPartials, MongoidId {
  period_departments?: PeriodDepartment[];
}
