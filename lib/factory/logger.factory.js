const factory = require('./factory.js');

const { Logger } = require('C:\\component\\lib\\logger.js');
/**
* IsSingleton: false 
* Create Logger 
* @param {scopeId}
*/
function createLogger({scopeId}) {
    let container = factory.getContainer({ scopeId, type: Logger, variableName:'logger', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: Logger, variableName:'logger', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createLogger };
