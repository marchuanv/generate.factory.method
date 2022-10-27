function MessageContentMetadata({ contextName, data }) {
    this.constructor({ contextName, data });
};
MessageContentMetadata.prototype.contentType = null;
MessageContentMetadata.prototype.contentLength = -1;
MessageContentMetadata.prototype.isEncrypted = false;
module.exports = { MessageContentMetadata };
