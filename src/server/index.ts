// import app from './app';
import App from './app';
import { inspect } from 'util';

const app = new App();

app.use('./playground', 'templates');

app.get('/test', (req: any, res: any, params: any) => {
  res.end(app.render('index.html'));
});

app.get('/arqueria/:libras/arco/:pulgadas', (req: any, res: any) => {
  const params = req.params;
  const queryParams = req.queryParams;

  console.log(req.body);

  res.end(
    `el ${queryParams[0]} se compro un arco de ${params[0]} libras y ${params[1]} pulgadas`,
  );
});

// app.get('/greeting', (req: any, res: any) => {
//     res.end(app.render('Your html file here'));
// })

app.run();
