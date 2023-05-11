import http from "http";
import html from "../../playground";
import Router from "../router/router";
import { HttpMethod } from '../router/httpMethod';
import fs from 'fs';
import { error } from "console";
import Server from './server';

const PORT = 3240;
const INVALID_TYPE = "Invalid type (try using 'templates' or 'static')";
const INVALID_DIRECTORY = 'No such directory';

class App {

  router: Router;
  server: Server;

  allowedTypes: string[] = ['templates', 'static'];
  folders: {} = {};

  constructor() {
    this.router = new Router();
    this.server = new Server(this.router);
  }

  run(port: number = PORT): void {
    this.server.listen(port);
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
    if(!this.allowedTypes.includes(type))
      throw error(INVALID_TYPE);

    if (!this.checkFile(path, true))
      throw error(INVALID_DIRECTORY);

    this.folders[type] = path;
  }

  render(filename: string): any {
    if (!this.checkFile(filename, false)) 
      throw error('No such file');
    return fs.readFileSync(this.folders['templates'] + '/' + filename);
  }

  private checkFile(file: string, path: boolean) {
    if (!path)
      return fs.existsSync(this.folders['templates'] + '/' + file);
    return fs.existsSync(file);
  }
}

export default App;
