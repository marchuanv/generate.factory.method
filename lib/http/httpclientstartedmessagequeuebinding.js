function HttpClientStartedMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpClientStartedMessageQueueBinding };