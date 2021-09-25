import { MongoidId } from './mongoid-id';

interface Deduction {
  mon?: number;
  tue?: number;
  wed?: number;
  thu?: number;
  fri?: number;
  sat?: number;
  sun?: number;
}

interface DepartmentItemPartials {
  days: string;
  deduction?: Deduction;
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
