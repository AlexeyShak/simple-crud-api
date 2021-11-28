const { ERRORS } = require("../constants/errors");

postObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(!obj.hasOwnProperty('name')){
            return ERRORS.NAME_NOT_ENTERED;
        }
        if(typeof obj.name !== 'string'){
            return ERRORS.NAME_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('age')){
            return ERRORS.AGE_NOT_ENTERED;
        }
        if(typeof obj.age !== 'number'){
            return ERRORS.AGE_NOT_NUMBER;
        };
        if(!obj.hasOwnProperty('hobbies')){
            return ERRORS.HOBBIES_NOT_ENTERED;
        }
        if(!Array.isArray(obj.hobbies)){
            return ERRORS.HOBBIES_NOT_ARRAY;
        };
    };  
};


putObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    if(obj.hasOwnProperty('name') && typeof obj.name !== 'string'){
        return ERRORS.NAME_NOT_A_STRING;
    };
    if(obj.hasOwnProperty('age') && typeof obj.age !== 'number'){
        return  ERRORS.AGE_NOT_NUMBER;
    };
    if(obj.hasOwnProperty('hobbies') && !Array.isArray(obj.hobbies)){
        return ERRORS.HOBBIES_NOT_ARRAY;
    };

};
module.exports = {postObjValidator, putObjValidator};