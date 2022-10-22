function ClientMessageBus({ contextName, clientRequestMessageBus, clientResponseMessageBus, messageConverter }) { 
    this.constructor({ contextName, clientRequestMessageBus, clientResponseMessageBus, messageConverter });
}
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };
