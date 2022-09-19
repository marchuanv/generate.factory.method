function HttpServerStoppedMessageQueueBinding({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStoppedMessageQueueBinding };