import { HttpMethod } from './httpMethod';

interface pair {
  path: string;
  cb: () => void;
}

export interface tuple {
  method: HttpMethod;
  callBackPair: pair;
}
