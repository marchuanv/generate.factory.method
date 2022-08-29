function HttpClientRequestMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpClientRequestMessageQueueBinding };