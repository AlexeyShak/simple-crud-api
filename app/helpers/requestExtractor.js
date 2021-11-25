module.exports = requestDataExtractor = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body = body + chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });

    });
}
