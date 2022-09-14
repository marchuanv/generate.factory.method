function ClientMessageBus({ clientRequestMessageBus, clientResponseMessageBus, messageConverter }) {}
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };
