import http from 'http';
import Router from './router';
const PORT = 3240;

class App {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  router: Router;

  constructor() {
    this.server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('geronnnn');
    });

    this.router = new Router();
  }

  run(port: number = PORT): void {
    this.server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  }

  get(path: string, cb: () => void) {
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
