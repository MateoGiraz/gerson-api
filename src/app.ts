import http from 'http';
const PORT = 3240;

const app = {
  run(port: number = PORT): void {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('hello world');
    });

    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  },
};

export default app;
