function HttpServerStoppedMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpServerStoppedMessageQueueBinding };