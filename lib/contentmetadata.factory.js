const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js'); 
function ContentMetadataFactory({ metadata,data }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new ContentMetadata({ metadata,data });
    }});
} 
module.exports = { ContentMetadataFactory }; 
