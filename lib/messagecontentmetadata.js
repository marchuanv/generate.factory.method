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
    let { contentType } = createContentType({ scopeId, name });
    let contentLength = Buffer.byteLength(_data);
    Object.defineProperty(this, 'contentType', { configurable: false, get: () => contentType });
    Object.defineProperty(this, 'contentLength', { configurable: false, get: () => contentLength });
    Object.defineProperty(this, 'isEncrypted', { configurable: false, writable: false, value: isEncrypted });
    Object.defineProperty(this, 'setContentLength', { configurable: false, writable: false, value: ({ length }) => contentLength = length });
    Object.defineProperty(this, 'setContentType', { configurable: false, writable: false, value: ({ name }) => contentType = createContentType({ scopeId, name }) });
}
MessageContentMetadata.prototype.contentType = null;
MessageContentMetadata.prototype.contentLength = -1;
MessageContentMetadata.prototype.isEncrypted = false;
module.exports = { MessageContentMetadata };
