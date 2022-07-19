const factory = require('./factory.js');

const { SharedMessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createSharedMessageQueue({}) {
    const container = factory.createContainer({ type: SharedMessageQueue, variableName:'sharedMessageQueue', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedMessageQueue };
