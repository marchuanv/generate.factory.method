function HttpServerStartedMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpServerStartedMessageQueueBinding };