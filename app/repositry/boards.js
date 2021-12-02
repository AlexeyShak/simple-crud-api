
const {v4: uuidv4} = require('uuid');

const boards = [{
    id: uuidv4(),
    title: 'Random board',
    columns: []
}];

module.exports = {boards};