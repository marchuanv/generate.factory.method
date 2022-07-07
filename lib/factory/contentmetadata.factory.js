const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js');
function createContentMetadata({metadata,data}) {

    return new ContentMetadata({metadata,data});
}
module.exports = { createContentMetadata };
