const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports =  {
    target: 'node',
    entry: './index.js',
    plugins: [
        new Dotenv(),
    ],   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['*', '.js', '.json']
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'

};