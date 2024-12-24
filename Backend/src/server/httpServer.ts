import http from 'http';

const PORT = 3000;
const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello World\n`);
});

server.listen(PORT, () => {
    console.log(`${new Date().toLocaleTimeString()} - Server is running on port ${PORT}`);
});

export default server;