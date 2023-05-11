// import app from './app';
import App from './app';
import { inspect } from 'util';

const app = new App();

app.use('./playground', 'templates');

app.get('/', (req: any, res: any, params: any) => {
    res.end(app.render('index.html'));
});

// app.get('/greeting', (req: any, res: any) => {
//     res.end(app.render('Your html file here'));
// })

app.run();
