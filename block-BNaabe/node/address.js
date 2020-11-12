let http = require('http');
let qs = require('querystring');

function serverHandler(req, res){
    let store = ''
   req.on('data', (chunk) => {
    store = store + chunk
   });
   req.on('end', () => {

       let ob =  qs(store);
       console.log(ob);
       res.end(ob);
   })
}
let server = http.createServer(serverHandler);
server.listen(9000, () => console.log('Server is running on 9000'));