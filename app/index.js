const http = require('http');
const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES} = require('./constants/constants');
const requestExtractor = require('./helpers/requestExtractor');
const { sendResponse } = require('./helpers/response');
const { postObjValidator, putObjValidator } = require('./validators/validators');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/person\/.+/;

let data = [{
    id: uuidv4(),
    name: 'Random Person',
    age: 24,
    hobbies: ['random hobbie']
}];

http.createServer(function(request, response){
  
    if(request.method === REQUEST_METHODS.GET && request.url === '/person' ){
        sendResponse(response, STATUS_CODES.OK, data);
    }
    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){
        let personId = request.url.split('/')[2];
        if(!uuidValidator.test(personId)){
            response.writeHead(STATUS_CODES.BAD_REQUEST);
            return response.end('User ID format is not valid');
        };
    
        const result = data.find(el => el.id === personId);
        if(result === undefined){
            response.writeHead(STATUS_CODES.NOT_FOUND);
            response.end('Element does not exist')
        }
        else response.end(JSON.stringify(result));
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/person'){
        requestExtractor(request)
            .then(postData => {
                let dataObj;
                try{
                    dataObj = JSON.parse(postData);
                }
                catch (err){
                    response.writeHead(STATUS_CODES.SERVER_ERROR);
                    return response.end('JSON parse error');
                };
                const validationError = postObjValidator(dataObj)
                if(validationError === undefined){
                    dataObj.id = uuidv4();
                    data.push(dataObj);
                    response.writeHead(STATUS_CODES.CREATED);
                    response.end(JSON.stringify(dataObj));
                }
                else{
                    response.end(validationError);
                };
            });

    }
    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){
        let urlElArr = request.url.split('/');
        if(!uuidValidator.test(urlElArr[2])){
            response.writeHead(STATUS_CODES.BAD_REQUEST);
            return response.end('User ID format is not valid');
        };
        let requestId = (el) => {
            return el.id === urlElArr[2];
        }
        let result = data.findIndex(requestId);
        if(result == -1){
            response.writeHead(STATUS_CODES.NOT_FOUND);
            response.end('No element found!');
        }
        else{
            requestExtractor(request)
            .then(putData => {
                let putDataObj;
                try{
                    putDataObj = JSON.parse(putData);
                }
                catch (err){ 
                    response.writeHead(STATUS_CODES.SERVER_ERROR);
                    return response.end('JSON parse error');
                }
                const validationError = putObjValidator(putDataObj)
                if(validationError == undefined){
                    data[result].name = putDataObj.name || data[result].name;
                    if(putDataObj.name !== undefined){
                        data[result].name = putDataObj.name;
                    }
                    if(putDataObj.age !== undefined){
                        data[result].age = putDataObj.age;
                    }
                    if(putDataObj.hobbies !== undefined){
                        data[result].hobbies = putDataObj.hobbies;
                    }
                    response.end(JSON.stringify(data[result]));   
                }
                else{
                    response.end(validationError);
                }

            })
        }
    }
    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){
        let urlElArr = request.url.split('/');
        if(!uuidValidator.test(urlElArr[2])){
            response.writeHead(STATUS_CODES.BAD_REQUEST);
            return response.end('User ID format is not valid');
        };
        function elementValidator(element){
            return element.id !== urlElArr[2];
        };
        let result = data.filter(elementValidator);
        if(result.length === data.length){
            response.writeHead(STATUS_CODES.NOT_FOUND);
            response.end('Element not found');
        }
        else{
            data = result;
            response.writeHead(STATUS_CODES.NO_CONTENT);
            response.end();
        } 
    }
    else{
        response.writeHead(STATUS_CODES.NOT_FOUND);
        response.end('Endpoint not found!');
    };
}).listen(process.env.PORT);

