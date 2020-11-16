let fs = require('fs');
let http = require('http');
let usersPath = __dirname + "/users/";
let url = require('url');
let server = http.createServer(serverHandler);

function serverHandler(req, res) {
    let parseUrl = url.parse(req.url, true);
    let getName = parseUrl.query.username;
    let pathName = parseUrl.pathname;
    console.log(pathName);
    console.log(req.method, req.url);
    let store = ''
    req.on('data', (chunk) => {
        store = store + chunk;
    });

    req.on('end', () => {
        if (req.method == "POST" && pathName == '/users') {
            let name = JSON.parse(store).username;
            console.log(usersPath + name + ".json")

            fs.open(usersPath + name + ".json", "wx", (err, nf) => {
                console.log(nf, 'hshhshs');
                if (err) console.log(err);
                fs.writeFile(nf, store, (err) => {
                    if (err) console.log(err);
                    fs.close(nf, (err) => {
                        if (err) console.log(err);
                        res.end(`${name} is created successfully.`);
                    });
                });
            });

        } else if (req.method == "GET" && pathName == '/users') {

            console.log(usersPath + getName + ".json")
            fs.open(usersPath + getName + ".json", "r", (err, nf) => {
                if (err) console.log(err);
                fs.readFile(nf, (err, user) => {
                    if (err) console.log(err);
                    res.end(user);
                });
            });

        } else if (req.method == 'DELETE' && pathName == '/users') {
            let df = usersPath + getName + ".json";
            /*
    fs.open(usersPath + getName + ".json", "r+", (err, df) => {
        if(err) console.log(JSON.parse(err));
        console.log(df);
*/
            fs.unlink(df, (err) => {
                if (err) console.log(err);
                res.end('File Deleted Successfully!!')
            });

        }else if (req.method == 'PUT' && pathName == '/users') {
         console.log(usersPath + getName + ".json");
         

            fs.open(usersPath + getName + ".json", "r+", (err, uf) => {
                console.log(uf);
                if(err) console.log(JSON.stringify(err));

                fs.ftruncate(uf, (err) => {
                    if (err) console.log(JSON.stringify(err));
                });
                
                fs.writeFile(uf, store, (err) => {
                    if (err) console.log(err);
                    fs.close(uf, (err) => {
                        if (err) console.log(JSON.parse(err));
                        res.end('Update Successfully')
                    })
                })
                
            })
        }
    });
}
server.listen(3000, () => {
    console.log('Server is running on 3000')
});