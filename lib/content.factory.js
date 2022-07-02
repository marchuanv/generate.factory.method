const utils = require('utils');
const { Content } = require('D:\\component\\lib\\content.js');
function ContentFactory({ data,metadata,encryption }) {
    utils.createProperty(this, 'create', () => {
        return new Content({ data,metadata,encryption });
    });
}
module.exports = { ContentFactory };
