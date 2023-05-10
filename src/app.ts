import http from 'http';
import Router from './router';
import { HttpMethod } from './httpMethod';

const PORT = 3240;

class App {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  router: Router;

  constructor() {
    this.server = http.createServer();
    this.router = new Router();
    this.server.on('request', (req, res) => {
      if (!Object.keys(HttpMethod).includes(req.method)){
        res.end('Invalid HTTP Method!');
      }
      //res.write(`Valid request with the method: ${req.method}\n`);
      if (!this.router.routes[req.method].includes(req.url)){
        res.end('Invalid url!!!');
      }
      //res.write(`Valid url: ${req.url}`);
      console.log(this.router.routes);
      this.router.routes[req.method][this.router.routes[req.method].indexOf(req.url) + 1](req, res);
    });
  }

  run(port: number = PORT): void {
    this.server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  }

  get(path: string, cb: (req: any, res: any) => void) {
    this.router.get(path, cb);
  }

  post(path: string, cb: () => void) {
    this.router.post(path, cb);
  }

  put(path: string, cb: () => void) {
    this.router.put(path, cb);
  }

  delete(path: string, cb: () => void) {
    this.router.delete(path, cb);
  }
}

export default App;
