const factory = require('../factory.js');

const { HttpServerRequestMessageBus } = require('C:\\component\\lib\\http\\httpserverrequestmessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerRequestMessageBus 
* @param {scopeId}
*/
function createHttpServerRequestMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerRequestMessageBus, variableName:'httpServerRequestMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerRequestMessageBus, variableName:'httpServerRequestMessageBus', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerRequestMessageBus };
