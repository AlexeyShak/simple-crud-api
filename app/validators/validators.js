const { ERRORS } = require("../constants/errors");

postObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return 'Requested data is not an object';
    }
    else{
        if(!obj.hasOwnProperty('name')){
            return 'No name entered';
        }
        else{
            if(typeof obj.name !== 'string'){
                return 'Name is not a string';
            }
        };
        if(!obj.hasOwnProperty('age')){
            return 'No age entered';
        }
        else{
            if(typeof obj.age !== 'number'){
                return 'Age is not a number'
            }
        };
        if(!obj.hasOwnProperty('hobbies')){
            return 'No hobbies entered';
        }
        else{
            if(!Array.isArray(obj.hobbies)){
                return 'Hobbies is not an array';
            }
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
        return 'Age is not a number';
    };
    if(obj.hasOwnProperty('hobbies') && !Array.isArray(obj.hobbies)){
        return 'Name is not a string';
    };

};
module.exports = {postObjValidator, putObjValidator};