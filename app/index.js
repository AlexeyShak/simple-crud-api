const { error } = require('console');
const http = require('http');
const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES} = require('./constants/constants');
const { ERRORS } = require('./constants/errors');
const requestExtractor = require('./helpers/requestExtractor');
const { sendResponseEnd } = require('./helpers/response');
const { postObjValidator, putObjValidator } = require('./validators/validators');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/person\/.+/;

let data = [{
    id: uuidv4(),
    name: 'Random Person',
    age: 24,
    hobbies: ['random hobbie']
}];

// http.createServer(function(request, response){
  
//     if(request.method === REQUEST_METHODS.GET && request.url === '/person' ){
//         sendResponseEnd(response, STATUS_CODES.OK, data);
//     }
//     else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){
//         let personId = request.url.split('/')[2];
//         if(!uuidValidator.test(personId)){
//             return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
//         };
    
//         const result = data.find(el => el.id === personId);
//         if(result === undefined){
//             sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.PERSON_NOT_FOUND)
//         }
//         else sendResponseEnd(response, STATUS_CODES.OK, result);
//     }
//     else if(request.method === REQUEST_METHODS.POST && request.url === '/person'){
//         requestExtractor(request)
//             .then(postData => {
//                 let dataObj;
//                 try{
//                     dataObj = JSON.parse(postData);
//                 }
//                 catch (err){
//                     return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
//                 };
//                 const validationError = postObjValidator(dataObj)
//                 if(validationError === undefined){
//                     dataObj.id = uuidv4();
//                     data.push(dataObj);
//                     sendResponseEnd(response, STATUS_CODES.CREATED, dataObj)
//                 }
//                 else{
//                     sendResponseEnd(response, STATUS_CODES.OK, validationError);
//                 };
//             });

//     }
//     else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){
//         let personId = request.url.split('/')[2];
//         if(!uuidValidator.test(personId)){
//             return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
//         };
//         let result = data.findIndex(el => el.id === personId);
//         if(result == -1){
//             sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.PERSON_NOT_FOUND);
//         }
//         else{
//             requestExtractor(request)
//             .then(putData => {
//                 let putDataObj;
//                 try{
//                     putDataObj = JSON.parse(putData);
//                 }
//                 catch (err){ 
//                     return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
//                 }
//                 const validationError = putObjValidator(putDataObj)
//                 if(validationError == undefined){
//                     data[result].name = putDataObj.name || data[result].name;
//                     if(putDataObj.name !== undefined){
//                         data[result].name = putDataObj.name;
//                     }
//                     if(putDataObj.age !== undefined){
//                         data[result].age = putDataObj.age;
//                     }
//                     if(putDataObj.hobbies !== undefined){
//                         data[result].hobbies = putDataObj.hobbies;
//                     }
//                     sendResponseEnd(response, STATUS_CODES.OK, data[result]) 
//                 }
//                 else{
//                     sendResponseEnd(response, STATUS_CODES.OK, validationError);
//                 }

//             })
//         }
//     }
//     else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){
//         let urlElArr = request.url.split('/');
//         if(!uuidValidator.test(urlElArr[2])){
//             return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
//         };
//         function elementValidator(element){
//             return element.id !== urlElArr[2];
//         };
//         let result = data.filter(elementValidator);
//         if(result.length === data.length){
//             sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.PERSON_NOT_FOUND)
//         }
//         else{
//             data = result;
//             sendResponseEnd(response, STATUS_CODES.NO_CONTENT)
//         } 
//     }
//     else{
//         sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.ENDPOINT_NOT_FOUND)
//     };
// }).listen(process.env.PORT);

