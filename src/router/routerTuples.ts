import { HttpMethod } from './httpMethod';

export interface pair {
  path: string;
  cb: () => void;
}

export interface tuple {
  method: HttpMethod;
  duplaConCallback: pair;
}
