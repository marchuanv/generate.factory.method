const { ContentMetadata } = require('./contentmetadata');
const { Encryption } = require('./encryption');
const utils = require("utils");
function Content({ data, metadata, encryption }) {
    if (!data) {
        throw new Error("the 'content' parameter is null or undefined");
    }
    if (!(encryption instanceof Encryption)) {
        throw new Error("the 'encryption' parameter is null, undefined or not of type: Encryption");
    }
    if (!metadata) {
        throw new Error("the 'metadata' parameter is null or undefined");
    }
    const contentMetadata = new ContentMetadata({ data, metadata });
    const object = utils.getJSONObject(data);
    if (contentMetadata.isEncrypted) { //if encrypted it must be a string
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
    Object.defineProperty(this, 'getMetadata', { configurable: false, writable: false, value: () => {
        return contentMetadata;
    }});
};
Content.prototype.getData = function() {};
Content.prototype.getMetadata = function() {};
module.exports = { Content };




