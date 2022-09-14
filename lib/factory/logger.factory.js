const { Factory } = require('../factory.js');
const { LoggerFactoryContainer } = require('C:\\component\\lib\\factory\\logger.factory.container.json');
const { Logger } = require('C:\\component\\lib\\logger.prototype.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');

const factory = new Factory(LoggerFactoryContainer);

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
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createLogger };
