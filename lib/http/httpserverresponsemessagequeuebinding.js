function HttpServerResponseMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpServerResponseMessageQueueBinding };