const messageQueueTypes = {
    1: 'HttpClientMessageQueue',
    2: 'HttpServerMessageQueue',
    3: 'WebSocketMessageQueue',
    4: 'MessageQueue'
};
function MessageQueueType({ messageQueueTypeCode }) {
    this.code = messageQueueTypeCode;
    this.description = messageQueueTypes[messageQueueTypeCode];
}
module.exports = { MessageQueueType };
