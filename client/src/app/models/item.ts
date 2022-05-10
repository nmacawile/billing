import { MongoidId } from './mongoid-id';
import { Timestamps } from './timestamps';

export interface ItemParams {
  name: string;
  price: number;
  _item_type: 'broadsheet' | 'tabloid';
}

export interface Item extends ItemParams, MongoidId, Timestamps {}
