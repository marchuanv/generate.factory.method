const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { HttpServerRequestMessageBus } = require('C:\\component\\lib\\http\\httpserverrequestmessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageBus 
* @param {scopeId}
*/
function createHttpServerRequestMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerRequestMessageBus, variableName:'httpServerRequestMessageBus', singleton: false });
    container.config({});
    container.config(createHttpServerRequestMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageBus };
