const factory = require('./factory.js');
const { createEvent } = require('C:\\component\\lib\\factory\\event.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { EventPublisher } = require('C:\\component\\lib\\eventpublisher.js');
/**
* Create EventPublisher
* @param {eventDescription,eventCode,eventSource}
*/
function createEventPublisher({eventDescription,eventCode,eventSource}) {
    const container = factory.createContainer({ type: EventPublisher, variableName:'eventPublisher', singleton: false });
    container.config({eventDescription,eventCode,eventSource});
    container.config(createSharedMessageQueue({}));
container.config(createEvent({eventDescription,eventCode,eventSource}));
    container.complete();
    return container.references;
}
module.exports = { createEventPublisher };
