const sendResponseEnd = (res, status, data) => {
    res.writeHeader(status);
    res.end(JSON.stringify(data));
};


 module.exports = {sendResponseEnd};