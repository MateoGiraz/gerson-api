// import app from './app';
import App from './app';
import { inspect } from 'util';

const app = new App();

app.use('./Folder with HTML templates', 'templates');

app.get('/', (req: any, res: any) => {
    res.end('Default route');
});

app.get('/greeting', (req: any, res: any) => {
    res.end(app.render('Your html file here'));
})

app.run();
