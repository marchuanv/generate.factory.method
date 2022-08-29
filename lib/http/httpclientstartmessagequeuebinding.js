function HttpClientStartMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { HttpClientStartMessageQueueBinding };