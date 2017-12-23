const fs=require('fs');
const http =require('http');
let highScore = {
  highScore :0
};
const getContentType = function(file){
  let contentTypes ={
    '.js' : 'text/javascript',
    '.html':'text/html',
    '.css' : 'text/css',
    '.jpg' :'text/jpg',
    '.jpeg':'text/jpeg'
  };
  let extension=file.slice(file.lastIndexOf('.'));
  return contentTypes[extension];
};

const isFile=function(file){
  return fs.existsSync(file);
}

const requestHandler= function(request,response){
  let file=request.url=='/'? 'index.html' :request.url.slice(1);
  if(isFile(file)){
    let contentType = getContentType(file);
    response.writeHead(200,{'Content-Type':contentType});
    // response.setHeader('Content-Type',contentType);
    // response.statusCode = 200;
    response.write(fs.readFileSync(file));
  }else if (file == 'highscore') {
    response.write(JSON.stringify(highScore));
  } else {
    response.statusCode=404;
    response.write('the file not found');
  }
  response.end();
}
const server=http.createServer(requestHandler);
server.listen(9999);
