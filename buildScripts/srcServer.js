import url from 'url';
import http from 'http';
import path from 'path';
import fs from 'fs';

let unixConverter  = require("./naturalToUnix");
let naturalConverter = require("./unixToNatural");

const port = 2500;

//creating server and parsing the request
const server = http.createServer(function(req,res){
   let date = url.parse(req.url).pathname.slice(1);
	console.log(req);
   //if empty pathname then go to homepage
   if(date == '' || date == 'favicon.ico') {
     fs.readFile(path.join(__dirname,'../src/index.html'),function(err,data) {
         if(err)
            send404(res);
         else
            sendFile(res,data);
     });
   } else {
     let obj = {"unix":date,"natural":date};

     //if its a natural date convert to unix
     if(isNaN(date)) {
        obj.unix = getUnixDate(date);
        obj.natural = date.split("%20").join(' ');
     } else {
        obj.natural = getNormalDate(date);
     }

     //sending response
     res.setHeader('Content-Type','application/json');
     res.end(JSON.stringify(obj));
   }
});

//convert unix date to natural
function getNormalDate(date) {
    return naturalConverter.unixToNatural(date);
}

//convert natural date to unix
function getUnixDate(date) {
    return unixConverter.naturalToUnix(date);
}

//sending home file
function sendFile(response,fileContents) {

    response.writeHead(200,
        {"content-type": "text/html"}
    );
    response.end(fileContents);
}

//handling error
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

//listening to port
server.listen(process.env.PORT || port);
