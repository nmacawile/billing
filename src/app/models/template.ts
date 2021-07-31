import { MongoidId } from './mongoid-id';
import { Timestamps } from './timestamps';

interface Client {
  name: string;
  address?: string;
}

export interface TemplateParams {
  name: string;
  _paper_size?: 'short' | 'long';
  split?: boolean;
  client: Client;
}

export interface Template extends TemplateParams, MongoidId, Timestamps {}
