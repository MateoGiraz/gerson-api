// import app from './app';
import {App} from './app';

const app = new App();

app.use('./playground', 'templates');

app.get('/test', (req: any, res: any, params: any) => {
  res.end(app.render('index.html'));
});

app.get('/arqueria/:libras/arco/:pulgadas', (req: any, res: any) => {
  const params = req.params;
  const queryParams = req.queryParams;

  res.end(
    `el ${queryParams[0]} se compro un arco de ${params[0]} libras y ${params[1]} pulgadas`,
  );
});

app.run();
