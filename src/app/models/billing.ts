import { MongoidId } from './mongoid-id';
import { Period, PeriodParams } from './period';

interface BillingPartials {
  client_name: string;
  client_address?: string;
  start_date: Date;
  end_date: Date;
  total?: number;
  discount?: number;
  _format: string;
}

export interface BillingParams extends BillingPartials {
  template?: string;
  periods: PeriodParams;
}

export interface Billing extends MongoidId, BillingPartials {
  template_id?: { $oid: string };
  periods: Period[];
  created_at?: Date;
  updated_at?: Date;
}
