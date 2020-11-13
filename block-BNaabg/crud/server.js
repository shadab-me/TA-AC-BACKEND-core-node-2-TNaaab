
let fs = require('fs');
let http = require('http');
let usersPath = __dirname + "/users/";
let url = require('url');
let server = http.createServer(serverHandler);

function serverHandler(req, res){
let parseUrl = url.parse(req.url, true);
let getName  = parseUrl.query.username;
 console.log(getName);
let pathName = parseUrl.pathname;
console.log(pathName);



console.log(pathName);
   let store = ''
req.on('data', (chunk) => {
    store =  store + chunk;
});

req.on('end', () => {
    if(req.method == "POST" && pathName == '/users'){
      let name = JSON.parse(store).username;
      console.log(usersPath + name + ".json")
       fs.open(usersPath + name + ".json", "wx", (err, nf) => {
          console.log(nf, 'hshhshs');
           if(err) console.log(err);
          fs.writeFile(nf, store, (err) => {
            if(err) console.log(err);
            fs.close(nf, (err) => {
                if(err) console.log(err);
                res.end(`${name} is created successfully.`);
            });
           });
      });

    }else if(req.method == "GET" && pathName == '/users'){
       
        console.log(usersPath + getName + ".json")
        fs.open(usersPath + getName + ".json", "r", (err, nf) => {
           if(err) console.log(err);
           fs.readFile(nf, (err, user) => {
                if(err) console.log(err);
                res.end(user);
            }); 
     });
     
};

});
}

server.listen(3000, () => {
    console.log('Server is running on 3000')
});