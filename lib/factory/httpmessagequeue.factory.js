
const { HttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.js');
function createHttpMessageQueue({}) {
    
    const httpMessageQueue = new HttpMessageQueue({});
    return {httpMessageQueue};
}
module.exports = { createHttpMessageQueue };
