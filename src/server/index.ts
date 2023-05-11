// import app from './app';
import App from './app';
import { inspect } from 'util';

const app = new App();

app.use('./playground', 'templates');

app.get('/test', (req: any, res: any, params: any) => {
  res.end(app.render('index.html'));
});

app.get('/test/:id/test/:id2', (req: any, res: any) => {
  const params = req.params;
  const queryParams = req.queryParams;

  res.end(
    `/test/:id/test/:id2 endpoint was called
    parameters: ${params[0]} & ${params[1]}
    queryParameters: ${queryParams[0]} & ${queryParams[1]} `,
  );
});

// app.get('/greeting', (req: any, res: any) => {
//     res.end(app.render('Your html file here'));
// })

app.run();
