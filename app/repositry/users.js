
const {v4: uuidv4} = require('uuid');

const users = [{
    id: uuidv4(),
    name: 'Random Person',
    login: 'login',
    password: 'password'
},
{
    id: uuidv4(),
    name: 'Alesha',
    login: 'login',
    password: 'password'  
}];

module.exports = {users};