// import app from './app';
import App from './app';
import { inspect } from 'util';

const app = new App();

app.use('./playground', 'templates');

app.get('/test', (req: any, res: any, params: any) => {
  res.end(app.render('index.html'));
});

app.get('/test/:id/test/:id2', (req: any, res: any, params: any) => {
  res.end(
    `/test/:id/test/:id2 endpoint was called as /test/${params[0]}/test/${params[1]}`,
  );
});

// app.get('/greeting', (req: any, res: any) => {
//     res.end(app.render('Your html file here'));
// })

app.run();
