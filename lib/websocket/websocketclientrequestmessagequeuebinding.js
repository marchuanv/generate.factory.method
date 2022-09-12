function WebSocketClientRequestMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { WebSocketClientRequestMessageQueueBinding };