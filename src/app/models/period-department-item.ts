import { MongoidId } from './mongoid-id';

export interface PeriodDepartmentItemParams {
  price: number;
  name: string;
  days: string;
  quantity: number;
  total_copies: number;
  total_deductions: number;
  amount: number;
  days_off?: { date: number; amount: number }[];
}

export interface PeriodDepartmentItem
  extends MongoidId,
    PeriodDepartmentItemParams {}
