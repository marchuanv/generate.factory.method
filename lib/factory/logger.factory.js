const factory = require('./factory.js');

const { Logger } = require('C:\\component\\lib\\logger.js');
/**
* Create Logger
* @param {}
*/
function createLogger({}) {
    const container = factory.createContainer({ type: Logger, variableName:'logger', singleton: false });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createLogger };
