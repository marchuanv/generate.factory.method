function MessageMetadata({ metadata, token, senderAddress, recipientAddress }) {
    this.constructor({ metadata, token, senderAddress, recipientAddress });
};
MessageMetadata.prototype.create = function({ name, value }) {};
module.exports = { MessageMetadata };
