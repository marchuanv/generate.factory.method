const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js'); 
function ContentMetadataFactory({ metadata,data }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new ContentMetadata({ metadata,data });
    }});
} 
module.exports = { ContentMetadataFactory }; 
