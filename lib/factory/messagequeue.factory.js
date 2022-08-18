const factory = require('./factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
/**
* Create MessageQueue
* @param {}
*/
function createMessageQueue({}) {
    const container = factory.createContainer({ type: MessageQueue, variableName:'messageQueue', singleton: false });
    container.config({});
    container.config(createLogger({}));
    container.complete();
    return container.references;
}
module.exports = { createMessageQueue };
