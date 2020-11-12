console.log(__dirname);
/*
let http = require('http');

let server = http.createServer(handlerServer);
function handlerServer(req, res){
    if(req.method == "POST" && req.url == "/"){
        let store = ""
        req.on('data', (chuck) => {
          store = store + chuck;
        });

        req.on('end', () => {
           res.writeHead(201, {'Content-Type': 'text/plain'});
           res.end(store);
        });
    }

}
server.listen(3000, () => console.log('Server is running on 3000'))
*/

let http = require('http');
const { parse } = require('path');

let server = http.createServer(handlerServer);
function handlerServer(req, res){
    if(req.method == "POST" && req.url == "/"){
        let store = ""
        req.on('data', (chunk) => {
          store = store + chunk;
        });

        req.on('end', () => {
           res.writeHead(201, {'Content-Type': 'text/json'});
           let object = JSON.parse(store);
            res.end(object.name);
        });
    }

}
server.listen(3000, () => console.log('Server is running on 3000'))