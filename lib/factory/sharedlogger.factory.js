const factory = require('./factory.js');

const { SharedLogger } = require('D:\\component\\lib\\sharedlogger.js');
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
