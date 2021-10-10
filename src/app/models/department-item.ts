import { MongoidId } from './mongoid-id';

interface DepartmentItemPartials {
  days: string;
  deduction?: number[];
  price: number;
  quantity: number;
  position: number;
}

export interface DepartmentItemParams extends DepartmentItemPartials {
  item: string;
}

export interface DepartmentItem extends DepartmentItemPartials, MongoidId {
  item_id: { $oid: string };
}
