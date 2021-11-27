const http = require('http');
const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES} = require('./constants/constants');
const requestExtractor = require('./helpers/requestExtractor');
const { postObjValidator, putObjValidator } = require('./validators/validators');
const regExp = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const regExpIncome = /\/person\/.+/;

let data = [{
    id: uuidv4(),
    name: 'Random BOT',
    age: 24,
    hobbies: []
}];


http.createServer(function(request, response){
  
    if(request.method === REQUEST_METHODS.GET && request.url === '/person' ){
        response.writeHead(STATUS_CODES.OK);
        response.end(JSON.stringify(data));
    }
    else if(request.method === REQUEST_METHODS.GET && regExpIncome.test(request.url)){
        let urlElArr = request.url.split('/');
        if(!regExp.test(urlElArr[2])){
            response.writeHead(STATUS_CODES.BAD_REQUEST);
            return response.end('User ID format is not valid');
        };
        function elementValidator(element){
            return element.id === urlElArr[2];
        }
        let result = data.find(elementValidator);
        if(result == undefined){
            response.writeHead(STATUS_CODES.NOT_FOUND);
            response.end('Element does not exist')
        }
        else response.end(JSON.stringify(result));
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/person'){
        requestExtractor(request)
            .then(function responseData(postData){
                let dataObj;
                try{
                    dataObj = JSON.parse(postData);
                }
                catch (err){
                    response.writeHead(STATUS_CODES.SERVER_ERROR);
                    return response.end('JSON parse error');
                };
                const validationError = postObjValidator(dataObj)
                if(validationError == undefined){
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
    else if(request.method === REQUEST_METHODS.PUT && regExpIncome.test(request.url)){
        let urlElArr = request.url.split('/');
        if(!regExp.test(urlElArr[2])){
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
                .then((putData) => {
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
                        if(putDataObj.name !== undefined){
                            data[result].name = putDataObj.name
                        }
                        if(putDataObj.age !== undefined){
                            data[result].age = putDataObj.age
                        }
                        if(putDataObj.hobbies !== undefined){
                            data[result].hobbies = putDataObj.hobbies
                        }
                        response.end(JSON.stringify(data[result]));   
                    }
                    else{
                        response.end(validationError);
                    }

                })
        }
    }
    else if(request.method === REQUEST_METHODS.DELETE && regExpIncome.test(request.url)){
        let urlElArr = request.url.split('/');
        if(!regExp.test(urlElArr[2])){
            response.writeHead(STATUS_CODES.BAD_REQUEST);
            return response.end('User ID format is not valid');
        };
        function elementValidator(element){
            return element.id !== urlElArr[2];
        };
        let result = data.filter(elementValidator);
        if(result.length == data.length){
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

