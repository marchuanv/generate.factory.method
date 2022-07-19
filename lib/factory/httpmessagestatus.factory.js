const factory = require('./factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js');
function createHttpMessageStatus({messageStatusCode}) {
    let container = factory.createContainer(HttpMessageStatus);
    container.add({messageStatusCode});
    container.add(createMessageStatus({messageStatusCode}));
    const httpMessageStatus = new HttpMessageStatus(container);
    container.add({httpMessageStatus});
    return container;
}
module.exports = { createHttpMessageStatus };
