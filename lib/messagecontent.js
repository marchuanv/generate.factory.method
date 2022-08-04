const utils = require("utils");
function MessageContent({ data, messageMetadata, messageContentSecurity, messageContentMetadata }) {
    const { createUserSession } = require('./factory/usersession.factory.js');
    let { userid } = messageMetadata;
    const { userSession } = createUserSession({ userId: userid });
    const { userSecurity } = userSession.getUserSecurity();

    if (userSecurity.isAuthorised()) {
        
        const { contentType, isEncrypted } = messageContentMetadata;

        let decryptedData = null;
        let encryptedData = null;

        if (isEncrypted && contentType.name === 'base64Text') {
            decryptedData = userSecurity.decryptJSONToObject({ encryptedJsonStr: data.replace('Encrypted:', '') });
        } else {
            let object = null;  
            if (typeof data === 'string') {
                if (contentType.name === 'txt') {
                    object = { text: data };
                }
            }
            encryptedData = userSecurity.encryptObjectToJSON({ object });
            encryptedData = `Encrypted:${encryptedData}`;
        }
    
        Object.defineProperty(this, 'getDecryptedData', { configurable: false, writable: false, value: () => {
            return decryptedData;
        }});
        Object.defineProperty(this, 'getEncryptedData', { configurable: false, writable: false, value: () => {
            return encryptedData;
        }});

    } else {
        const userId = messageContentSecurity.getUserId();
        Object.defineProperty(this, 'getDecryptedData', { configurable: false, writable: false, value: () => {
            throw new Error(`'${userId}' is not authorised.`);
        }});
        Object.defineProperty(this, 'getEncryptedData', { configurable: false, writable: false, value: () => {
            throw new Error(`'${userId}' is not authorised.`);
        }});
    }
};
MessageContent.prototype.getEncryptedData = function() { };
MessageContent.prototype.getDecryptedData = function() { };
module.exports = { MessageContent };
