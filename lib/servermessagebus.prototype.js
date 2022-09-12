function ServerMessageBus({ 
    httpServerResponseMessageBus,
    httpServerRequestMessageBus,
    webSocketServerRequestMessageBus,
    webSocketServerResponseMessageBus,
    messageConverter
}) {};
ServerMessageBus.prototype.publish = async function({ message }) { };
ServerMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ServerMessageBus };
