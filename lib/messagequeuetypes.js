const queueTypes = {
    1: "HttpClientResponseMessage",
    2: "HttpClientRequestMessage",
    3: "HttpServerResponseMessage",
    4: "HttpServerRequestMessage"
};
function MessageQueueTypes() {
    const items = Object.keys(queueTypes).map(key => {
        return {
            code: key,
            name: queueTypes[key],
        };
    });
    Object.defineProperty(this, 'types', { configurable: false, writable: false, value: items });
};
MessageQueueTypes.types = [];
module.exports = { MessageQueueTypes };
