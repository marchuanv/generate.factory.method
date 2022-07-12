const utils = require("utils");
function MessageContent({ data, messageContentMetadata, encryption }) {
    const object = utils.getJSONObject(data);
    if (messageContentMetadata.isEncrypted) { //if encrypted it must be a string
        Object.defineProperty(this, 'getData', { configurable: false, writable: false, value: () => {
            return encryption.decryptJSONToObject({ encryptedJsonStr: object });
        }});
    } else if (typeof data === 'object') {
        Object.defineProperty(this, 'getData', { configurable: false, writable: false, value: () => {
            return encryption.encryptObjectToJSON({ object });
        }});
    } else if (typeof data === 'string' && object && typeof object === 'object') {
        Object.defineProperty(this, 'getData', { configurable: false, writable: false, value: () => {
            return object;
        }});
    } else {
        Object.defineProperty(this, 'getData', { configurable: false, writable: false, value: () => {
            return data;    
        }});
    }
};
MessageContent.prototype.getData = function() {};
module.exports = { MessageContent };




