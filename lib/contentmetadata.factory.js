const utils = require('utils');
const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js');
function ContentMetadataFactory({ metadata,data }) {
    utils.createProperty(this, 'create', () => {
        return new ContentMetadata({ metadata,data });
    });
}
module.exports = { ContentMetadataFactory };
