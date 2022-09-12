function WebSocketClientResponseMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { WebSocketClientResponseMessageQueueBinding };