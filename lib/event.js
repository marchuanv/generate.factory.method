const events = {
    1: 'StartHttpMessageBusServer',
    2: 'HttpServerRequestError',
    3: 'HttpMessageBusServerStarted',
    4: 'SendHttpClientRequests',
    5: 'HttpClientResponseError',
    6: 'HttpClientRequestError',
    7: 'HttpServerError',
    8: 'StopHttpMessageBusServer',
    9: 'HttpMessageBusServerStopped'
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
