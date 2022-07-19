const factory = require('./factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js');
function createHttpMessageStatus({messageStatusCode}) {
    const container = factory.createContainer({ type: HttpMessageStatus, variableName:'httpMessageStatus', singleton: false });
    container.config({messageStatusCode});
    container.config(createMessageStatus({messageStatusCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageStatus };
