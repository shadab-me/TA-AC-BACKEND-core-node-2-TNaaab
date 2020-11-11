let http = require('http');
let fs = require('fs');
let server = http.createServer(serverHandler);

function serverHandler(req, res){
   fs.createReadStream('./readme.text').pipe(res);

}

server.listen(3000, () => console.log('Server is running on 3000'));