import http from 'http';
const PORT = 3240;

class Test {
    server;

    constructor() {
        this.server = http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('xdddd');
        });
        //return this._server;
    }

    run(port: number = PORT): void {
        this.server.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    }
};

export default Test;