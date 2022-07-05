const { Content } = require('C:\\component\\lib\\content.js');
function createContent({ data,metadata,encryption }) {
    return new Content({ data,metadata,encryption });
}
module.exports = { createContent };
