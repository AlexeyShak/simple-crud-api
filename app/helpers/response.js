export const sendResponse = (res, status, data) => {
    res.writeHeader(status);
    res.end(JSON.stringify(data));
};