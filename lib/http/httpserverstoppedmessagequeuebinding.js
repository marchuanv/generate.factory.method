function HttpServerStoppedMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { HttpServerStoppedMessageQueueBinding };