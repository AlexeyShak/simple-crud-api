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
        if(!obj.hasOwnProperty('login')){
            return ERRORS.LOGIN_NOT_ENTERED;
        }
        if(typeof obj.login !== 'string'){
            return ERRORS.LOGIN_IS_NOT_A_STRING;
        };
        if(!obj.hasOwnProperty('password')){
            return ERRORS.PASSWORD_NOT_ENTERED;
        }
        if(typeof obj.password !== 'string'){
            return ERRORS.PASSWORD_NOT_STRING;
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
    if(obj.hasOwnProperty('login') && typeof obj.login !== 'string'){
        return  ERRORS.LOGIN_IS_NOT_A_STRING;
    };
    if(obj.hasOwnProperty('password') && typeof obj.password !== 'string'){
        return ERRORS.PASSWORD_NOT_STRING;
    };

};
postBoardObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(!obj.hasOwnProperty('title')){
            return ERRORS.TITLE_NOT_ENTERED;
        }
        if(typeof obj.title !== 'string'){
            return ERRORS.TITLE_NOT_A_STRING;
        };
        if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)){
            return ERRORS.COLUMNS_IS_NOT_AN_ARRAY;
        }

    };  
};
putBoardObjValidator = (obj) => {
    if(typeof obj !== 'object'){
        return ERRORS.NOT_AN_OBJECT;
    }
    else{
        if(obj.hasOwnProperty('title') && typeof obj.title !== 'string'){
            return ERRORS.TITLE_NOT_A_STRING;
        };
        if(obj.hasOwnProperty('columns') && !Array.isArray(obj.columns)){
            return ERRORS.COLUMNS_IS_NOT_AN_ARRAY;
        }

    };  
};
module.exports = {postObjValidator, putObjValidator, postBoardObjValidator, putBoardObjValidator};