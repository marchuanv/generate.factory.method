function WebSocketConnection({ host, port, websocketMessageHandlerFactory, errorMessages }) {
    if (!(websocketMessageHandlerFactory instanceof WebSocketMessageHandlerFactory)) {
        throw new Error("'websocketMessageHandlerFactory' parameter is not of type: WebSocketMessageHandlerFactory");
    }
    if (!(errorMessages instanceof ErrorMessages)) {
        throw new Error("'errorMessages' parameter is not of type: ErrorMessages");
    }
    this.host = host;
    this.port = port;
}
WebSocketConnection.prototype.isOpen = function() {
}
WebSocketConnection.prototype.send = async function({ httpRequestMessage }) {
};
WebSocketConnection.prototype.open = function() {
}
module.exports = { WebSocketConnection };