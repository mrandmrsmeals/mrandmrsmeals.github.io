
//need file system to read files
const fs = require('fs');
//need  url to handle server file paths
const url = require('url');
//need http to create and listen with server
const http = require('http');




//set up server
const server = http.createServer((req,res)=>{
    
    const urlobject = url.parse(req.url, true);
    const pathName = urlobject.pathname;
    console.log(pathName);
    if (pathName =='/' || pathName=='/index.html'){
        //read in main lab page
        fs.readFile(`${__dirname}/src/templates/index.html`, 'utf-8', (err,data)=>{
            //render the page
            res.writeHead(200, {'Content-type': 'text/html'});
            //console.log(data);
            res.end(data)
            
        });
        
        
    }
    
   
   
    if((/\.(jpg|png|ico)$/i).test(pathName)){
        console.log(`${__dirname}${pathName} is wanted`);
        fs.readFile(`${__dirname}${pathName}`,(err,data)=>{
            res.writeHead(200, {'Content-type': 'img/jpg'})
            res.end(data)
        });
    
    }

    if((/\.(css|css)$/i).test(pathName)){
        console.log('css file wanted!')
        if(pathName.search('SpryAssets')==1){
            fs.readFile(`${__dirname}/SpryAssets/SpryAccordian.css`, 'utf-8', (err,data)=>{
                res.writeHead(200, {'Content-type': 'text/css'});
                res.end(data)
            });
        }else{
            fs.readFile(`${__dirname}/stylesheet.css`, 'utf-8', (err,data)=>{
                res.writeHead(200, {'Content-type': 'text/css'});
                res.end(data)
        });
        }
    }

   
    
     /*else if(pathName.search('SpryAssets')==1 && (/\.(css|css)$/i).test(pathName)){
        console.log('css file wanted!')
        fs.readFile(`${__dirname}/SpryAssets/SpryAccordian.css`, 'utf-8', (err,data)=>{
            //res.writeHead(200, {'Content-type': 'text/html'});
            res.end(data)
        });
    }*/
    
    //res.end('req');
});


server.listen(1337, '127.0.0.1', ()=>{
    console.log('let the eating begin')
})

