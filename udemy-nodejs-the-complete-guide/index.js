const http = require('http');
const PORT = 3000;

const users = ['User 1', 'User 2', 'User 3', 'User 4'];

const indexRoute = res => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.write('<html><body><h1>Hello! Welcome to NodeJS</h1></body><html>');
  res.end();
};

const usersRoute = res => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  res.write('<html><body><h1>Users List</h1><ul>');
  users.forEach(user => {
    res.write(`<li>${user}</li>`);
  });
  res.write('</ul></body><html>');
  res.end();
};

const createUserRoute = res => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  res.write('<html><body><h1>Create User</h1><form method="POST">');
  res.write('<input type="text" name="user"/>');
  res.write('<input type="submit" value="Submit"/>');
  res.write('</form></body><html>');
  res.end();
};

const addUser = body => {
  const [_, userName] = body.split('=');
  users.push(userName);
};

http
  .createServer((req, res) => {
    const path = req.url;
    const method = req.method.toUpperCase();

    if (path === '/' || path === '') {
      indexRoute(res);
      return;
    }

    if (path === '/users') {
      usersRoute(res);
      return;
    }

    if (path === '/create-user' && method === 'GET') {
      createUserRoute(res);
      return;
    }

    if (path === '/create-user' && method === 'POST') {
      const bodyBuffer = [];
      req.on('data', chunk => {
        bodyBuffer.push(chunk);
      });
      req.on('end', () => {
        const body = Buffer.concat(bodyBuffer).toString();
        addUser(body);
      });

      res.statusCode = 302;
      res.setHeader('Location', '/users');
      res.end();
      return;
    }

    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('404 Not Found :(');
    res.end();
  })
  .listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`);
  });
