let fs = require('fs');
let http = require('http');
 const qs = require('querystring');


function serverHandler(req, res){
let dataType  = req.headers['content-type'];
 
if(req.url == '/json' && req.method == 'POST'){
    let store = '';
     req.on('data', (chunk) => {
       store = store + chunk
     });
     req.on('end', () => {
         console.log(dataType);
        if(dataType == 'application/json'){
          let parseData = JSON.parse(store);
          res.end(parseData);
         }
         else if(dataType =='application/x-www-form-urlencoded'){
           let parseData = qs.parse(store);
            res.end(parseData);
}
     });
}
   res.end();
}

let server = http.createServer(serverHandler);
server.listen(7000, () => console.log('Server is running on 7000'));
