const factory = require('./factory.js');
const { createEvent } = require('D:\\component\\lib\\factory\\event.factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedSubscriptions } = require('D:\\component\\lib\\factory\\sharedsubscriptions.factory.js');
const { createSharedEventLogger } = require('D:\\component\\lib\\factory\\sharedeventlogger.factory.js');
const { EventPublisher } = require('D:\\component\\lib\\eventpublisher.js');
/**
* Create EventPublisher
* @param {contextId,eventDescription,eventCode,eventSource}
*/
function createEventPublisher({contextId,eventDescription,eventCode,eventSource}) {
    const container = factory.createContainer({ type: EventPublisher, variableName:'eventPublisher', singleton: false });
    container.config({contextId,eventDescription,eventCode,eventSource});
    container.config(createSharedEventLogger({}));
container.config(createSharedSubscriptions({}));
container.config(createSharedMessageQueue({}));
container.config(createEvent({eventDescription,eventCode,eventSource}));
    container.complete();
    return container.references;
}
module.exports = { createEventPublisher };
