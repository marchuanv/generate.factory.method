const factory = require('./factory.js');

const { Logger } = require('C:\\component\\lib\\logger.js');
/**
* IsSingleton: true
* Create Logger
* @param {}
*/
function createLogger({}) {
    const container = factory.createContainer({ type: Logger, variableName:'logger', singleton: true });
    container.config({});
    
    container.initialise();
    return container.references;
}
module.exports = { createLogger };
