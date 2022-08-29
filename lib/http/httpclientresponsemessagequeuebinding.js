function HttpClientResponseMessageQueueBinding({ messageQueue }) {
    messageQueue.bind({ bindingObj: this });
}
module.exports = { HttpClientResponseMessageQueueBinding };