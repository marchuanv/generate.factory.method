const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
const { HttpServerRequestMessageBus } = require('C:\\component\\lib\\http\\httpserverrequestmessagebus.prototype.js');
const getHttpServerRequestMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageBus 
* @param {scopeId}
*/
function createHttpServerRequestMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpServerRequestMessageBus, variableName:'httpServerRequestMessageBus', singleton: false });
    container.config(getHttpServerRequestMessageBusFactoryConfig());
    container.reference({});
        container.reference(createHttpServerRequestMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageBus };
