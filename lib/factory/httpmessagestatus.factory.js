const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js');
function createHttpMessageStatus({ messageStatus }) {
    return new HttpMessageStatus({ messageStatus });
}
module.exports = { createHttpMessageStatus };
