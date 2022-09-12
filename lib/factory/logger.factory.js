const { Factory } = require('../factory.js');
const factory = new Factory();

const { Logger } = require('C:\\component\\lib\\logger.js');
/**
* IsSingleton: true 
* Create Logger 
* @param {scopeId}
*/
function createLogger({scopeId}) {
    let container = factory.getContainer({ scopeId, type: Logger, variableName:'logger', singleton: true });
    container.config({});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createLogger };
