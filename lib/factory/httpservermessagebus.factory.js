const factory = require('./factory.js');

const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {scopeId}
*/
function createHttpServerMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
