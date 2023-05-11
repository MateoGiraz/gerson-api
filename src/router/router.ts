import { HttpMethod } from './httpMethod';
import { tuple } from './routerTuples';

class Router {
  routes: tuple[];

  constructor() {
    this.routes = [];

    const keys = Object.keys(HttpMethod);
    keys.forEach((key) => {
      this.routes[key] = [];
    });
  }

  get(path: string, cb: any) {
    this.routes[HttpMethod.GET].push(path, cb);
  }

  post(path: string, cb: any) {
    this.routes[HttpMethod.POST].push(path, cb);
  }

  put(path: string, cb: any) {
    this.routes[HttpMethod.PUT].push(path, cb);
  }

  delete(path: string, cb: any) {
    this.routes[HttpMethod.DELETE].push(path, cb);
  }
}

export default Router;
