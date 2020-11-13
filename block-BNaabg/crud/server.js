let fs = require('fs');
let http = require('http');
let usersPath = __dirname + "/users/"

let server = http.createServer(serverHandler);


function serverHandler(req, res){
  let store = ''
req.on('data', (chunk) => {
    store =  store + chunk;
});

req.on('end', () => {
    if(req.method == "POST" && req.url == '/users'){
      let name = JSON.parse(store).username;
      fs.open(usersPath + name + ".json", "wx", (err, nf) => {
          if(err) console.log(err);
          fs.writeFile(nf, store, (err) => {
            if(err) console.log(err);
           })
      })

       res.end(store);
    }
});
}
server.listen(3000, () => {
    console.log('Server is running on 3000')
});