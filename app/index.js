const http = require('http');
const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES, personID, personModel} = require('./constants/constants');
const requestExtractor = require('./helpers/requestExtractor');
const { postObjValidator, putObjValidator } = require('./validators/validators');
const regExp = /\/persons\/(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;

let data = [{
    id: uuidv4(),
    name: 'Artyom',
    age: 24
}];


http.createServer(function(request, response){
  
    if(request.method === REQUEST_METHODS.GET && request.url === '/persons' ){
        response.end(JSON.stringify(data));
    }
    else if(request.method === REQUEST_METHODS.GET && regExp.test(request.url)){
        let urlElArr = request.url.split('/');
        function elementValidator(element){
            return element.id === urlElArr[2];
        }
        let result = data.find(elementValidator);
        if(result == undefined){
            response.end('Element does not exist')
        }
        else response.end(JSON.stringify(result));
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/persons'){
        requestExtractor(request)
            .then(function responseData(postData){
                let dataObj = JSON.parse(postData);
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
    else if(request.method === REQUEST_METHODS.PUT && regExp.test(request.url)){
        let urlElArr = request.url.split('/');
        let requestId = (el) => {
            return el.id === urlElArr[2];
        }
        let result = data.findIndex(requestId);
        if(result == -1){
            response.end('No element found!');
        }
        else{
            requestExtractor(request)
                .then((putData) => {
                    let putDataObj = JSON.parse(putData);
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
    else if(request.method === REQUEST_METHODS.DELETE && regExp.test(request.url)){
        let urlElArr = request.url.split('/');
        function elementValidator(element){
            return element.id !== urlElArr[2];
        };
        let result = data.filter(elementValidator);
        if(result.length == data.length){
            response.end('Element not found');
        }
        else{
            data = result;
            response.end('Element successfuly deleted');
        } 
    }
    else{
        response.writeHead(STATUS_CODES.NOT_FOUND);
        response.end('Endpoint not found!1');
    };

    console.log(`request data: ${request.url} ,  ${request.method}`);
}).listen(process.env.PORT);

