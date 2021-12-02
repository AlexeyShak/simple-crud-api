const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../constants/errors');
const {boards} = require('../repositry/boards');

const {requestDataExtractor} = require('../helpers/requestExtractor');
const { postObjValidator, putObjValidator } = require('../validators/validators');


const getByID = (boardId) => {
    console.log('board ID: ',boardId)
    const result = boards.find(el => el.id === boardId);
    console.log('result: ',result);
    if(result === undefined){
        console.log('result after undefined',result)
       return ERRORS.USER_NOT_FOUND
    }
    else{
       return result;
    } ;
};



module.exports = {getByID}