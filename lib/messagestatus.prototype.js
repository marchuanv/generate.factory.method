function MessageStatus({ messageStatusCode }) {
    this.constructor({ messageStatusCode });
};
MessageStatus.prototype.match = function({ wildcard }) {};
MessageStatus.prototype.root = function() {};
module.exports = { MessageStatus };
