const utils = require("utils");

function MessageContentMetadata({ data }) {
    const { createContentType } = require('./factory/contenttype.factory.js');
    let name = null;
    const _data = utils.getJSONObject(data) || data;
    if (typeof _data === 'object') {
        name = 'json';
    } else if (typeof _data === 'string') {
        name = 'txt';
        if (utils.isBase64String(_data)) {
           name = 'base64Text';
        }
    }
    const { contentType } = createContentType({ name });
    Object.defineProperty(this, 'contentType', { configurable: false, writable: false, value: contentType });
    Object.defineProperty(this, 'contentLength', { configurable: false, writable: false, value: Buffer.byteLength(_data) });
    Object.defineProperty(this, 'isEncrypted', { configurable: false, writable: false, value: () => {
        if (utils.isBase64String(data)) {

            return true;
        }
        return true;
    }});
}
MessageContentMetadata.prototype.contentType = null;
MessageContentMetadata.prototype.contentLength = -1;
MessageContentMetadata.prototype.isEncrypted = false;
module.exports = { MessageContentMetadata };
