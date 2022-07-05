const { HttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.js');
function createHttpMessageQueue({ name,callback }) {
    return new HttpMessageQueue({ name,callback });
}
module.exports = { createHttpMessageQueue };
