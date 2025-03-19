const http = require('http');

const fs = require('fs');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    const filepath = __dirname + '/index.html';
    const html = fs.readFileSync(filepath);
    res.end(html);
})

server.listen(3000, ()=>{
    console.log('Server is running at http://localhost:3000');
})