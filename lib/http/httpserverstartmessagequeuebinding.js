function HttpServerStartMessageQueueBinding({ scopeId, messageQueue }) {
    messageQueue.bind({ bindingObj: this, scopeId });
}
module.exports = { HttpServerStartMessageQueueBinding };