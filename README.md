# gerson-api
<br />

![NPM Version](https://badgen.net/npm/v/gerson-api)  ![NPM Downloads](https://badgen.net/npm/dm/gerson-api)

### Installation:
```
$ npm install gerson-api
```
Make sure you have NodeJS installed on your computer with a version that supports Typescript.

### About the project:

Gerson API is a tool developed in Typescript oriented to backend development and APIs.

With a very simple syntax and configuration, Gerson allows you to create your first endpoint in very few lines.

```js
import { App } from 'gerson-api';

const app = new App();

app.get('/', (req, res) => {
    res.send('Hello from Gerson!');
});

app.run();
```

You might also want Gerson to create Endpoints for you. This methods use [gerson-db](https://github.com/MateoGiraz/gerson-db).
Initialize your database (postgres & mysql are supported), and then define the name of your table, and its attributes.
Gerson will create GET & POST methods for each attribute of your model.

```js
import { App } from 'gerson-api';

const app = new App();

app.initializeDatabase('postgresql://postgres:secret@localhost:5432/testDB');
app.initializeEndpoints('users', ['name', 'email']);
```

### Features:
- Simple and fast routing
- Query, URL and Body parameters
- Easy to use
- HTML template rendering

### Authors:
This project was originally created by [Mateo Giraz](https://github.com/MateoGiraz), [Matías Corso](https://github.com/mcorsom) and [Mateo Bonino](https://github.com/mateobonino)

### License:
[MIT](https://github.com/MateoGiraz/gerson-api/blob/develop/LICENSE)
