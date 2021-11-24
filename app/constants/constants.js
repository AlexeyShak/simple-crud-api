const {v4: uuidv4} = require('uuid');

const REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
const STATUS_CODES = {
    NOT_FOUND: 404,
    OK: 200
};
module.exports = {REQUEST_METHODS, STATUS_CODES};
