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
    
    this.server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (!this.isValidMethod(req.method))
        res.end(INVALID_METHOD);

      if (!this.isValidRoute(req.method, req.url))
        res.end(INVALID_URL);

      this.handleRequest(req, res);
    })
  }

  public listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  private isValidMethod(method: string) {
    return Object.keys(HttpMethod).includes(method);
  };

  private isValidRoute(method: string, url: string) {
    return this.router.routes[method].includes(url)
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {

    let chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {

      const data = Buffer.concat(chunks);
      const parseData = new URLSearchParams(data.toString());

      for (var pair of parseData.entries())
        this.dataobj[pair[0]] = pair[1];

      this.router.routes[req.method][this.getCallback(req)](req, res, JSON.stringify(this.dataobj));
    });
  }

  private getCallback(req: http.IncomingMessage) {
    return this.router.routes[req.method].indexOf(req.url) + 1;
  }
}

export default Server;