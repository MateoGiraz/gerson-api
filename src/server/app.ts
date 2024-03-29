import { Router } from '../router/router';
import * as fs from 'fs';
import { error } from 'console';
import Server from './server';
import Errors from '../utils/errors';
import { Table, Database } from 'gerson-orm';

const PORT = 3240;

class App {
  router: Router;
  server: Server;
  database: Database;

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

  post(path: string, cb: (req: any, res: any, params: any) => void) {
    this.router.post(path, cb);
  }

  put(path: string, cb: () => void) {
    this.router.put(path, cb);
  }

  delete(path: string, cb: () => void) {
    this.router.delete(path, cb);
  }

  initializeDatabase(connectionString: string) {
    this.database = new Database(connectionString);
  }

  initializeEndpoints(tableName: string, tableModel: string[]) {
    const table = new Table(tableName, tableModel, this.database);

    this.get('/' + tableName + '/:id', (req, res) => {
      const id = req.params[0];

      table.get([['id', id]], tableModel).then((tableName) => {
        const jsonResponse = JSON.stringify(tableName[0]);
        res.end(jsonResponse);
      });
    });

    this.get('/' + tableName, (req, res) => {
      table.getAll(tableModel).then((tableName) => {
        const jsonResponse = JSON.stringify(tableName);
        res.end(jsonResponse);
      });
    });

    this.post('/' + tableName, (req, res) => {
      const body = req.body;
      // Parse the JSON string
      console.log(body);
      res.end('ok');
      /*table.push(body).then((tableName) => {
        const jsonResponse = JSON.stringify(tableName);
        res.end(jsonResponse);
      });*/
    });
  }

  use(path: string, type: string): void {
    if (!this.allowedTypes.includes(type)) throw error(Errors.INVALID_TYPE);

    if (!this.checkFile(path, true)) throw error(Errors.INVALID_DIRECTORY);

    this.folders[type] = path;
  }

  render(filename: string): any {
    if (!this.checkFile(filename, false)) throw error('No such file');
    return fs.readFileSync(this.folders['templates'] + '/' + filename);
  }

  private checkFile(file: string, path: boolean) {
    if (!path) return fs.existsSync(this.folders['templates'] + '/' + file);
    return fs.existsSync(file);
  }
}

export { App };
