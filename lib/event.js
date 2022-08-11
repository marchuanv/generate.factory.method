const events = {
    1: 'StartHttpMessageBusServerEvent',
    2: 'HttpServerRequestErrorEvent',
    3: 'HttpMessageBusServerStartedEvent',
    4: 'SendHttpClientRequestsEvent',
    5: 'HttpClientResponseErrorEvent',
    6: 'HttpClientRequestErrorEvent',
    7: 'HttpServerErrorEvent',
    8: 'StopHttpMessageBusServerEvent',
    9: 'HttpMessageBusServerStoppedEvent'
};
const keys = Object.keys(events).sort((x,y) => x -y);
function Event({ eventCode, eventSource, eventDescription }) {
    Object.defineProperty(this, 'name', { configurable: false, writable: false, value: events[eventCode] });
    Object.defineProperty(this, 'source', { configurable: false, writable: false, value: eventSource });
    Object.defineProperty(this, 'description', { configurable: false, writable: false, value: eventDescription });
}
Event.prototype.name = '';
Event.prototype.source = '';
Event.prototype.description = '';
module.exports = { Event };
