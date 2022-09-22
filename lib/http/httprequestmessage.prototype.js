function HttpRequestMessage({ message }) {
    this.constructor({ message  });
};
HttpRequestMessage.prototype.getId = function() {};
HttpRequestMessage.prototype.getEncryptedContent = function() {};
HttpRequestMessage.prototype.getDecryptedContent = function() {};
HttpRequestMessage.prototype.getSenderAddress = function() {};
HttpRequestMessage.prototype.getRecipientAddress = function() {};
HttpRequestMessage.prototype.getContentMetadata = function() {};
HttpRequestMessage.prototype.getMessageMetadata = function() {};
HttpRequestMessage.prototype.getHeaders = function() {};
HttpRequestMessage.prototype.getPath = function() {};
HttpRequestMessage.prototype.getMessageStatus = function() {};
HttpRequestMessage.prototype.getMethod = function() {};
module.exports = { HttpRequestMessage };
