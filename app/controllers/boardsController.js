const {v4: uuidv4} = require('uuid');

const { REQUEST_METHODS, STATUS_CODES} = require('../constants/constants');
const { ERRORS } = require('../constants/errors');

const {sendResponseEnd} = require('../helpers/response');
const {getByID} = require('../services/boardService')
const {boards} = require('../repositry/boards');

const {requestDataExtractor} = require('../helpers/requestExtractor');
const {postBoardObjValidator, putBoardObjValidator} = require('../validators/validators');

const uuidValidator = /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/;
const urlValidator = /\/boards\/.+/;


const boardsController = (request, response) =>{
    if(request.method === REQUEST_METHODS.GET && request.url === '/boards' ){
        sendResponseEnd(response, STATUS_CODES.OK, boards);
    }
    else if(request.method === REQUEST_METHODS.GET && urlValidator.test(request.url)){
        let boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        }
        else {
            let getResult = getByID(boardId);
            console.log('user response', getResult);
            if(getResult === ERRORS.USER_NOT_FOUND){
                return sendResponseEnd(response, STATUS_CODES.NOT_FOUND, getResult)
            }
            else {
                return sendResponseEnd(response, STATUS_CODES.OK, getResult)
            };
        }
    }
    else if(request.method === REQUEST_METHODS.POST && request.url === '/boards'){
        requestDataExtractor(request)
            .then(postBoard => {
                let boardObj;
                try{
                    boardObj = JSON.parse(postBoard);
                }
                catch (err){
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                };
                const validationError = postBoardObjValidator(boardObj)
                if(validationError === undefined){
                    boardObj.id = uuidv4();
                    boards.push(boardObj);
                    sendResponseEnd(response, STATUS_CODES.CREATED, boardObj)
                }
                else{
                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
                };
            });
    }
    else if(request.method === REQUEST_METHODS.PUT && urlValidator.test(request.url)){
        let boardId = request.url.split('/')[2];
        if(!uuidValidator.test(boardId)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);  
        };
        let result = boards.findIndex(el => el.id === boardId);
        console.log(result);
        if(result == -1){
            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND);
        }
        else{
            requestDataExtractor(request)
            .then(putBoard => {
                let putBoardObj;
                try{
                    putBoardObj = JSON.parse(putBoard);
                    console.log(putBoardObj);
                }
                catch (err){ 
                    return sendResponseEnd(response, STATUS_CODES.SERVER_ERROR, ERRORS.JSON_PARSE_ERR);
                }
                const validationError = putBoardObjValidator(putBoardObj);
                console.log('validation error ' ,validationError);
                if(validationError == undefined){
                    boards[result].title = putBoardObj.title || boards[result].title;
                    if(putBoardObj.hasOwnProperty('columns')){
                        boards[result].columns = putBoardObj.columns || boards[result].columns;
                    }
                    sendResponseEnd(response, STATUS_CODES.OK, boards[result]) 
                }
                else{
                    sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, validationError);
                }

            })
        }
    }
    else if(request.method === REQUEST_METHODS.DELETE && urlValidator.test(request.url)){
        console.log('delete request URL', request.url)
        let boardID = request.url.split('/')[2];
        if(!uuidValidator.test(boardID)){
            return sendResponseEnd(response, STATUS_CODES.BAD_REQUEST, ERRORS.WRONG_ID_FORMAT);
        };
        function elementValidator(element){
            return element.id !== boardID;
        };
        let result = boards.filter(elementValidator);
        console.log('result: ',result)
        if(result.length === boards.length){
            sendResponseEnd(response, STATUS_CODES.NOT_FOUND, ERRORS.USER_NOT_FOUND)
        }
        else{
            console.log('else checkout'); 
            console.log('boards before', boards);
            boards = result; // ?????????????????????????????????????????????????????????????
            console.log('checkout');
            sendResponseEnd(response, STATUS_CODES.NO_CONTENT)
        } 
    }

}

module.exports = {boardsController}