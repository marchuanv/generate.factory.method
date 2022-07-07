const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js');
function createHttpMessageStatus({code}) {
    const messageStatus = createMessageStatus({code});
    const httpMessageStatus = new HttpMessageStatus({messageStatus});
    return {messageStatus,httpMessageStatus};
}
module.exports = { createHttpMessageStatus };
