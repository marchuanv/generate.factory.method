function HttpServerStopMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpServerStopMessageQueueBinding };