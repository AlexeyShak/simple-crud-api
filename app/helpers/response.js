const sendResponseEnd = (res, status, data) => {
    res.writeHeader(status);
    res.end(JSON.stringify(data));
};

const sendResponse = (res, status, data) => {
    res.writeHeader(status);
    return res.end(JSON.stringify(data));
};
 module.exports = {sendResponse, sendResponseEnd};