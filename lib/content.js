const { ContentMetadata } = require('./contentmetadata');
const { Encryption } = require('./encryption');
const utils = require("utils");
function Content({ data, metadata, encryption }) {
    if (!data) {
        throw new Error("the 'content' parameter is null or undefined");
    }
    if (!(encryption instanceof Encryption)) {
        console.log("WARNING: the 'encryption' parameter is undefined, null or not of type: Encryption");
    }
    const contentMetadata = new ContentMetadata({ data, metadata });
    if (encryption) {
        if (contentMetadata.isEncrypted()) {
            Object.defineProperty(this, 'getData', { writable: false, value: () => {
                return encryption.decryptJSONToObject({ encryptedJsonStr: data });
            }});
        } else {
            Object.defineProperty(this, 'getData', { writable: false, value: () => {
                return encryption.encryptObjectToJSON({ object: data });
            }});
        }
    } else {
        if (typeof data === 'object') {
            Object.defineProperty(this, 'getData', { writable: false, value: () => {
                return utils.getJSONString(data);     
            }});
        } else if (utils.getJSONObject(data)) {
            const jsonData = utils.getJSONObject(data);
            Object.defineProperty(this, 'getData', { writable: false, value: () => {
                return jsonData;    
            }});
        } else {
            Object.defineProperty(this, 'getData', { writable: false, value: () => {
                return data;    
            }});
        }
    }
    Object.defineProperty(this, 'getMetadata', { writable: false, value: () => {
        return contentMetadata;
    }});
};
Content.prototype.getData = function() {};
Content.prototype.getMetadata = function() {};
module.exports = { Content };




