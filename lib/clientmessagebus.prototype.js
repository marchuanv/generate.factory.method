function ClientMessageBus({ clientRequestMessageBus, clientResponseMessageBus, messageConverter }) { 
    this.constructor({ clientRequestMessageBus, clientResponseMessageBus, messageConverter });
}
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };
