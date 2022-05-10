import { MongoidId } from './mongoid-id';
import { Timestamps } from './timestamps';
import { Department, DepartmentParams } from './department';

interface TemplatePartials {
  name: string;
  _format?: 'short' | 'long';
  client_name: string;
  client_address?: string;
}

export interface TemplateParams extends TemplatePartials {
  departments?: DepartmentParams[];
}

export interface Template extends TemplatePartials, MongoidId, Timestamps {
  departments?: Department[];
}
