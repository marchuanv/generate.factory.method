const { Factory } = require('../factory.js');
const factory = new Factory();

const { LoggerFactoryContainer } = require('C:\\component\\lib\\factory\\logger.container.json');
const { Logger } = require('C:\\component\\lib\\logger.prototype.js');

/**
* IsSingleton: LoggerFactoryContainer.singleton
* Create Logger
* @param {scopeId}
*/
function createLogger({scopeId}) {
    const args = {scopeId};
    const binding = LoggerFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, LoggerFactoryContainer);
}
module.exports = { createLogger };
