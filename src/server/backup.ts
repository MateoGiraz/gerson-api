import http from "http";
import html from "../../playground";
import Router from "../router/router";
import { HttpMethod } from '../router/httpMethod';
import fs from 'fs';
import { error } from "console";

const PORT = 3240;

class App {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
  router: Router;
  allowedTypes: string[] = ['templates', 'static'];
  folders: {} = {};
  dataobj: {} = {};
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
      let chunks = [];
      const dataObj = {};
      req.on('data', (chunk) => {
        chunks.push(chunk);
      });
      req.on('end', () => {
        console.log('Chunks arrived');
        const data = Buffer.concat(chunks);
        const dataString = data.toString();
        const parseData = new URLSearchParams(dataString);
        //const dataObj = {};

        for (var pair of parseData.entries()) {
          this.dataobj[pair[0]] = pair[1];
        }
        console.log('Dataobj:', this.dataobj);
      });
      this.router.routes[req.method][this.router.routes[req.method].indexOf(req.url) + 1](req, res, this.dataobj);
    });
  }

  run(port: number = PORT): void {
    this.server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  }

  get(path: string, cb: (req: any, res: any, params: any) => void) {
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
