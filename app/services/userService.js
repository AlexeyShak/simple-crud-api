const {v4: uuidv4} = require('uuid');

const { ERRORS } = require('../constants/errors');
const {users} = require('../repositry/users');
const {requestDataExtractor} = require('../helpers/requestExtractor');
const { postObjValidator, putObjValidator } = require('../validators/validators');


const getByID = (userId) => {
    console.log('user ID: ',userId)
    const result = users.find(el => el.id === userId);
    console.log('result: ',result);
    if(result === undefined){
        console.log('result after undefined',result)
       return ERRORS.USER_NOT_FOUND
    }
    else{
        delete result.password;
       return result;
    } ;
};



module.exports = {getByID}