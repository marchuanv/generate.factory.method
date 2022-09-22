function Message({ 
    factoryContainerBindingName,
    Id,
    messageContent,
    messageContentMetadata,
    messageMetadata,
    messageStatus
}) {
    this.constructor({ 
        factoryContainerBindingName,
        Id,
        messageContent,
        messageContentMetadata,
        messageMetadata,
        messageStatus
    });
};
Message.prototype.getId = function() {};
Message.prototype.getSenderAddress = function() {};
Message.prototype.getRecipientAddress = function() {};
Message.prototype.getEncryptedContent = function() {};
Message.prototype.getDecryptedContent = function() {};
Message.prototype.getMessageMetadata = function() {};
Message.prototype.getContentMetadata = function() {};
Message.prototype.getMessageStatus = function() {};
module.exports = { Message };
