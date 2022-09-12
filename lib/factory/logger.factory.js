const { Factory } = require('../factory.js');
const factory = new Factory();

const { Logger } = require('C:\\component\\lib\\logger.prototype.js');
const getLoggerFactoryConfig = require('C:\\component\\lib\\factory\\logger.factory.config.js');
/**
* IsSingleton: true 
* Create Logger 
* @param {scopeId}
*/
function createLogger({scopeId}) {
    const container = factory.getContainer({ scopeId, type: Logger, variableName:'logger', singleton: true });
    container.config(getLoggerFactoryConfig());
    container.reference({});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createLogger };
