function MessageContentMetadata({ factoryContainerBindingName, data }) {
    this.constructor({ factoryContainerBindingName, data });
};
MessageContentMetadata.prototype.contentType = null;
MessageContentMetadata.prototype.contentLength = -1;
MessageContentMetadata.prototype.isEncrypted = false;
module.exports = { MessageContentMetadata };
