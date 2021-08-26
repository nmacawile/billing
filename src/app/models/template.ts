import { MongoidId } from './mongoid-id';
import { Timestamps } from './timestamps';
import { Department, DepartmentParams } from './department';

interface Client {
  name: string;
  address?: string;
}

interface TemplatePartials {
  name: string;
  _format?: 'short' | 'long';
  client: Client;
}

export interface TemplateParams extends TemplatePartials {
  departments?: DepartmentParams[];
}

export interface Template extends TemplatePartials, MongoidId, Timestamps {
  departments?: Department[];
}
