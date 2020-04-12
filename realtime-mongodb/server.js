const http = require('http');

const app = require('./app');
const io = require('./socket');


const server = http.createServer(app);
io(server); 


server.listen(9090, () => {
  console.log('Server is running on port', server.address().port);
});