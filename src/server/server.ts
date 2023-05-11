import http from 'http';
import Router from '../router/router';
import { HttpMethod } from '../router/httpMethod';

const INVALID_METHOD = 'Invalid Http Method';
const INVALID_URL = 'Invalid URL';

class Server {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  router: Router;

  dataobj: {} = {};

  constructor(router: Router) {
    this.router = router;
    this.server = http.createServer();

    this.server.on(
      'request',
      (req: http.IncomingMessage, res: http.ServerResponse) => {
        if (!this.isValidMethod(req.method)) {
          res.end(INVALID_METHOD);
        }

        const path = this.getPath(req, req.url);

        const queryParams = req.url
          .split('?')[1]
          .split('&')
          .map((param) => param.split('='));

        if (path == null) {
          res.end(INVALID_URL);
        }

        this.handleRequest(req, res, path, queryParams);
      },
    );
  }

  public listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  private isValidMethod(method: string) {
    return Object.keys(HttpMethod).includes(method);
  }

  private getPath(req: http.IncomingMessage, url: string): string {
    let requestdPath = req.url;
    let path = '';

    this.router.routes[req.method].forEach((route) => {
      if (!(typeof route == 'string')) {
        return null;
      }

      const splittedPath = route.split('/').slice(1, route.length);

      const splittedUrl = requestdPath.split('/').slice(1, req.url.length);

      if (splittedPath.length !== splittedUrl.length) {
        return null;
      }

      for (let i = 0; i < splittedPath.length; i++) {
        if (this.routeIsNotUrl(i, splittedPath, splittedUrl)) {
          return null;
        }
      }
      path = splittedPath.join('/');
      console.log(path);
    });
    return path;
  }

  private routeIsNotUrl(
    i: number,
    splittedPath: string[],
    splittedUrl: string[],
  ) {
    return (
      splittedPath[i] !== splittedUrl[i] && !splittedPath[i].startsWith(':')
    );
  }
  private handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse,
    path: string,
    queryParams: string[][],
  ) {
    const params = this.splitPath(req.url, (param) => {
      return !isNaN(parseInt(param));
    });

    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const data = Buffer.concat(chunks);
      const parseData = new URLSearchParams(data.toString());

      for (var pair of parseData.entries()) {
        this.dataobj[pair[0]] = pair[1];
      }

      this.router.routes[req.method][this.getCallback(req, path)](
        { queryParams, params, ...req },
        res,
      );
    });
  }

  private splitPath(url: string, checker: (param: string) => boolean) {
    const params = [];
    const splittedPath = url.split('?')[0].split('/').slice(1, url.length);

    splittedPath.map((param) => {
      if (checker(param)) {
        params.push(param);
      }
    });
    return params;
  }

  private getCallback(req: http.IncomingMessage, path: string) {
    return this.router.routes[req.method].indexOf('/' + path) + 1;
  }
}

export default Server;
