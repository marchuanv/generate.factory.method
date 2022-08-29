function HttpClientStopMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpClientStopMessageQueueBinding };