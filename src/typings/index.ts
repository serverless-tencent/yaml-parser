export * from './parse';

export interface AnyObject {
  [prodName: string]: any;
}

export interface Credential {
  secretId: string;
  secretKey: string;
  token?: string;
  region?: string;
}

export interface LayerOptions {
  org: string;
  app: string;
  stage: string;
  runtime: string;
  name?: string;
  region?: string;
}
