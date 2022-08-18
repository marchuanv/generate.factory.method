const utils = require("utils");

function MessageContentMetadata({ scopeId, data }) {
    const { createContentType } = require('./factory/contenttype.factory.js');
    let isEncrypted = false;
    let name = null;
    let _data = utils.getJSONObject(data) || data;
    if (typeof _data === 'object') {
        name = 'json';
        _data = utils.getJSONString(_data);
    } else if (typeof _data === 'string') {
        name = 'txt';
        isEncrypted = data.startsWith('Encrypted:');
        if (utils.isBase64String(data.replace('Encrypted:',''))) {
           name = 'base64Text';
        }
    }
    const { contentType } = createContentType({ scopeId, name });
    Object.defineProperty(this, 'contentType', { configurable: false, writable: false, value: contentType });
    Object.defineProperty(this, 'contentLength', { configurable: false, writable: false, value: Buffer.byteLength(_data) });
    Object.defineProperty(this, 'isEncrypted', { configurable: false, writable: false, value: isEncrypted });
}
MessageContentMetadata.prototype.contentType = null;
MessageContentMetadata.prototype.contentLength = -1;
MessageContentMetadata.prototype.isEncrypted = false;
module.exports = { MessageContentMetadata };
