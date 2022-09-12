function ClientMessageBus({ 
    httpClientRequestMessageBus,
    httpClientResponseMessageBus,
    webSocketClientRequestMessagebus,
    webSocketClientResponseMessageBus,
    messageConverter
}) {}
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };
