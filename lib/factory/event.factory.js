const factory = require('./factory.js');

const { Event } = require('C:\\component\\lib\\event.js');
/**
* Create Event
* @param {eventDescription,eventCode,eventSource}
*/
function createEvent({eventDescription,eventCode,eventSource}) {
    const container = factory.createContainer({ type: Event, variableName:'event', singleton: false });
    container.config({eventDescription,eventCode,eventSource});
    
    container.complete();
    return container.references;
}
module.exports = { createEvent };
