// import app from './app';
import App from './app';

const app = new App();

app.get('/', (req: any, res: any) => {
    res.end('Default route');
});

app.get('/greeting', (req: any, res: any) => {
    res.end('Hello!');
})

app.run();
