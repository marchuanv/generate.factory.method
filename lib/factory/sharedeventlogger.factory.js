const factory = require('./factory.js');

const { SharedEventLogger } = require('C:\\component\\lib\\sharedeventlogger.js');
/**
* Create SharedEventLogger
* @param {}
*/
function createSharedEventLogger({}) {
    const container = factory.createContainer({ type: SharedEventLogger, variableName:'sharedEventLogger', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedEventLogger };
