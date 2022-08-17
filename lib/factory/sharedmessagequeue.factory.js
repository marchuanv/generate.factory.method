const factory = require('./factory.js');
const { createSharedLogger } = require('D:\\component\\lib\\factory\\sharedlogger.factory.js');
const { SharedMessageQueue } = require('D:\\component\\lib\\sharedmessagequeue.js');
/**
* Create SharedMessageQueue
* @param {}
*/
function createSharedMessageQueue({}) {
    const container = factory.createContainer({ type: SharedMessageQueue, variableName:'sharedMessageQueue', singleton: true });
    container.config({});
    container.config(createSharedLogger({}));
    container.complete();
    return container.references;
}
module.exports = { createSharedMessageQueue };
