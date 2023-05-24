const { App } = require('../../dist/lib/es5/index.js');

const app = new App();

app.use('./playground', 'templates');

app.get('/test', (req, res) => {
  res.end(app.render('index.html'));
});

app.get('/test/:id/test/:id2', (req, res) => {
  const params = req.params;
  const queryParams = req.queryParams;

  res.end(
    'Hello World ' + params[0] + params[1] + queryParams[0] + queryParams[1],
  );
});

app.run();
