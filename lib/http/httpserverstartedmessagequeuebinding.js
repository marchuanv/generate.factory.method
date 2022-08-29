function HttpServerStartedMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { HttpServerStartedMessageQueueBinding };