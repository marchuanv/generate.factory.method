const factory = require('./factory.js');

const { SharedLogger } = require('C:\\component\\lib\\sharedlogger.js');
/**
* Create SharedLogger
* @param {}
*/
function createSharedLogger({}) {
    const container = factory.createContainer({ type: SharedLogger, variableName:'sharedLogger', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedLogger };
