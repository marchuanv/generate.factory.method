function HttpClientStartedMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { HttpClientStartedMessageQueueBinding };