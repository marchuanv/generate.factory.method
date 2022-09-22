function MessageContent({ data, userSessions, messageMetadata, messageContentMetadata }) {
    this.constructor({ data, userSessions, messageMetadata, messageContentMetadata });
};
MessageContent.prototype.encryptedData = function() { };
MessageContent.prototype.decryptedData = function() { };
module.exports = { MessageContent };
