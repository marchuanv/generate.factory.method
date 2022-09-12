const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
const { HttpServerResponseMessageBus } = require('C:\\component\\lib\\http\\httpserverresponsemessagebus.prototype.js');
const getHttpServerResponseMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerResponseMessageBus 
* @param {scopeId,messageQueue}
*/
function createHttpServerResponseMessageBus({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerResponseMessageBus, variableName:'httpServerResponseMessageBus', singleton: false });
    container.config(getHttpServerResponseMessageBusFactoryConfig());
    container.reference({messageQueue});
        container.reference(createHttpServerResponseMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerResponseMessageBus };
