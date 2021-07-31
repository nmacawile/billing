import { MongoidId } from './mongoid-id';

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

export interface Template extends TemplateParams, MongoidId {
  created_at?: string;
  updated_at?: string;
}
