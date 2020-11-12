 let http = require('http');
 let qs = require('querystring');
function serverHandler(req, res){
 let dataType = req.headers['content-type'];
 console.log(dataType);
   let store = ''
   req.on('data', (chunk) => {
    store = store + chunk
   });
   req.on('end', () => {
  res.writeHead(201, {'content-type' : 'text/html'})
  
  if(dataType == "application/json"){
  let jsonData = JSON.parse(store);
     console.log(jsonData)
     let htmlIn = `<h1>${jsonData.name}</h1>
                   <h2>${jsonData.email}</h2>`;
                   res.end(htmlIn)
  }if(dataType == "application/x-www-form-urlencoded"){
      console.log(store);
      let ob = qs.parse(store);

      let htmlIn = `<h2>${ob.email}</h2>`;
                   res.end(htmlIn)
  }
  
});
}
let server = http.createServer(serverHandler);
server.listen(8000, () => console.log('Server is running on 8000'));