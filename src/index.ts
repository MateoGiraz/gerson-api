// import app from './app';
import App from './app';
import { inspect } from 'util';

const app = new App();

app.get('/', (req: any, res: any) => {
    res.end('Default route');
    console.log();
});

app.get('/greeting', (req: any, res: any) => {
    res.end('Hello!');
})

app.run();
