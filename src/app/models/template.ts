interface Client {
  name: string;
  address?: string;
}

export interface Template {
  _id: { $oid: string };
  name: string;
  _paper_size?: 'short' | 'long';
  split?: boolean;
  client: Client;
  created_at?: string;
  updated_at?: string;
}

export type TemplateParams = Omit<Template, '_id' | 'created_at' | 'updated_at'>;
