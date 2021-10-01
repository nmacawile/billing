import { DepartmentItemParams, DepartmentItem } from './department-item';
import { MongoidId } from './mongoid-id';

export interface DepartmentParams {
  name: string;
  department_items?: DepartmentItemParams[];
}

export interface Department extends MongoidId {
  name: string;
  department_items: DepartmentItem[];
}
