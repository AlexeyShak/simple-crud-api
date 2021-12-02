const { error } = require('console');
const http = require('http');

const { REQUEST_METHODS, STATUS_CODES} = require('./constants/constants');
const { ERRORS } = require('./constants/errors');
const requestExtractor = require('./helpers/requestExtractor');

const {usersController} = require('./controllers/userController')
const {boardsController} = require('./controllers/boardsController')

http.createServer((request, response) => {
    try{
        const url = request.url;
        if(url.startsWith('/users')){
            return usersController(request, response);
        }
        else if(url.startsWith('/boards')){
            return boardsController(request, response);
        }
    }catch (e){
        response.end('no url argument');
    }

}).listen(process.env.PORT)