function WebSocketResponseMessage({ message }) {
    this.constructor({ message });
};
WebSocketResponseMessage.prototype.something = function() {};
module.exports = { WebSocketResponseMessage };