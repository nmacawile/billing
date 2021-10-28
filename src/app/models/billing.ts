import { MongoidId } from './mongoid-id';

interface BillingPartials {
  client_name: string;
  client_address?: string;
  start_date: Date;
  end_date: Date;
}

export interface BillingParams extends BillingPartials {
  template?: string;
}

export interface Billing extends MongoidId, BillingPartials {
  template?: { $oid: string };
}
