let http = require('http');
let fs = require('fs');
function serverHandler(req, res){
if(req.method == "POST" && req.url == '/'){
    let store = '';
    req.on('data', (chunk) => {
       store = store + chunk;
    });
    req.on('end', () => {
        console.log(store)
    })
}
}


let server = http.createServer(serverHandler);
server.listen(3456, () => console.log('Server is running on port 3456'));