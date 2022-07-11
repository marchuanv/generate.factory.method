
const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js');
function createContentMetadata({metadata,data}) {
    
    const contentMetadata = new ContentMetadata({metadata,data});
    return {contentMetadata};
}
module.exports = { createContentMetadata };
