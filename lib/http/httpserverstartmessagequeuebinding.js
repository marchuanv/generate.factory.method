function HttpServerStartMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpServerStartMessageQueueBinding };