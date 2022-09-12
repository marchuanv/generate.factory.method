const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { HttpServerRequestMessageBus } = require('C:\\component\\lib\\http\\httpserverrequestmessagebus.prototype.js');
const getHttpServerRequestMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageBus 
* @param {scopeId,messageQueue}
*/
function createHttpServerRequestMessageBus({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpServerRequestMessageBus, variableName:'httpServerRequestMessageBus', singleton: false });
    container.config(getHttpServerRequestMessageBusFactoryConfig());
    container.reference({messageQueue});
        container.reference(createHttpServerRequestMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageBus };
