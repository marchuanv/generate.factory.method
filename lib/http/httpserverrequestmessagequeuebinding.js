function HttpServerRequestMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpServerRequestMessageQueueBinding };