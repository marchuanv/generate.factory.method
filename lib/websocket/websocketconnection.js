function WebSocketConnection({ host, port }) {
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