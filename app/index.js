const http = require('http');
const { REQUEST_METHODS, STATUS_CODES} = require('./constants/constants');
const regExp = /\/persons\/(\w+)/;

http.createServer(function(request, response){
    if(request.method === REQUEST_METHODS.GET && request.url === '/persons' ){
        response.end('Return all persons');
    }
    else if(request.method === REQUEST_METHODS.GET && regExp.test(request.url)){
        response.end('Return existing person');
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/persons'){
        response.end('Create new person');
    }
    else if(request.method === REQUEST_METHODS.PUT && regExp.test(request.url)){
        response.end('Modify existing person');
    }
    else if(request.method === REQUEST_METHODS.DELETE && regExp.test(request.url)){
        response.end('Delete existing person');
    }
    else{
        response.writeHead(STATUS_CODES.NOT_FOUND);
        response.end('Endpoint not found!1');
    };

    console.log(`request data: ${request.url} ,  ${request.method}`);
}).listen(process.env.PORT);
