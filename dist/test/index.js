const { App } = require('../../dist/lib/es5/index.js');

const app = new App();

app.use('./playground', 'templates');

app.get('/test', (req, res) => {
  res.end(app.render('index.html'));
});

app.get('/', (req, res) => {
  const body = req.body;
  res.end('ok');
});

app.initializeDatabase('postgresql://postgres:secret@localhost:5432/testDB');
app.initializeEndpoints('users', ['name', 'email']);

app.run();
