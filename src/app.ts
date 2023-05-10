import http from "http";
import html from "../playground";
import Router from "./router";
import { HttpMethod } from './httpMethod';
import fs from 'fs';
import { error } from "console";

const PORT = 3240;

class App {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  router: Router;
  allowedTypes: string[] = ['templates', 'static'];
  folders: {} = {};
  constructor() {
    this.server = http.createServer();

    this.router = new Router();
    this.server.on('request', (req, res) => {
      if (!Object.keys(HttpMethod).includes(req.method)){
        res.end('Invalid HTTP Method!');
      }
      if (!this.router.routes[req.method].includes(req.url)){
        res.end('Invalid url!!!');
      }
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

  use(path: string, type: string): void {
    if(!this.allowedTypes.includes(type)) {
      throw error('Invalid type');
    }
    if (!fs.existsSync(path)) {
      throw error('Invalid path');
    }
    this.folders[type] = path;
  }

  render(filename: string): any {
    if (!fs.existsSync(this.folders['templates'] + '/' + filename)) {
      throw error('No such file');
    }
    let myHtml = fs.readFileSync(this.folders['templates'] + '/' + filename);
    return myHtml;
  }
}

export default App;
