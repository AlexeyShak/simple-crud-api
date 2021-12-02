const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES} = require('../constants/constants');
const { ERRORS } = require('../constants/errors');

const {sendResponseEnd} = require('../helpers/response');
const {getByID, createUser} = require('../services/userService')
const {users} = require('../repositry/users');

const {requestDataExtractor} = require('../helpers/requestExtractor');
const { postObjValidator, putObjValidator } = require('../validators/validators');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/users\/.+/;


const usersController = (request, response) =>{
    if(request.method === REQUEST_METHODS.GET && request.url === '/users' ){
        users.forEach(el => delete el.password);
        sendResponseEnd(response, STATUS_CODES.OK, users);
    }
    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){
        let userId = request.url.split('/')[2];
        if(!uuidValidator.test(userId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        else {
            let getResult = getByID(userId);
            console.log('user response', getResult);
            if(getResult === ERRORS.USER_NOT_FOUND){
                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult)
            }
            else {
                return sendResponseEnd(response, STATUS_CODES.OK, getResult)
            };
        }
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/users'){
        requestDataExtractor(request)
            .then(postData => {
                let dataObj;
                try{
                    dataObj = JSON.parse(postData);
                }
                catch (err){
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                };
                const validationError = postObjValidator(dataObj)
                if(validationError === undefined){
                    dataObj.id = uuidv4();
                    users.push(dataObj);
                    sendResponseEnd(response, STATUS_CODES.CREATED, dataObj)
                }
                else{
                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
                };
            });
    }
    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){
        let userID = request.url.split('/')[2];
        if(!uuidValidator.test(userId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        };
        let result = users.findIndex(el => el.id === userId);
        console.log(result);
        if(result == -1){
            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);
        }
        else{
            requestDataExtractor(request)
            .then(putData => {
                let putDataObj;
                try{
                    putDataObj = JSON.parse(putData);
                    console.log(putDataObj);
                }
                catch (err){ 
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                }
                const validationError = putObjValidator(putDataObj);
                console.log('validation error ' ,validationError);
                if(validationError == undefined){
                    users[result].name = putDataObj.name || users[result].name;
                    users[result].login = putDataObj.login || users[result].login;
                    users[result].password = putDataObj.password || users[result].password;
                    sendResponseEnd(response, STATUS_CODES.OK, users[result]) 
                }
                else{
                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
                }

            })
        }
    }
    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){
        console.log('delete request URL', request.url)
        let userID = request.url.split('/')[2];
        if(!uuidValidator.test(userID)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
        };
        function elementValidator(element){
            return element.id !== userID;
        };
        let result = users.filter(elementValidator);
        console.log('result: ',result)
        if(result.length === users.length){
            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND)
        }
        else{
            console.log('else checkout');
            console.log('users before', users);
            users = result; // ?????????????????????????????????????????????????????????????
            console.log('checkout');
            sendResponseEnd(response, STATUS_CODES.NO_CONTENT)
        } 
    }

}

module.exports = {usersController}