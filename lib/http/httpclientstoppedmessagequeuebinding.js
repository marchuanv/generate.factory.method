function HttpClientStoppedMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpClientStoppedMessageQueueBinding };