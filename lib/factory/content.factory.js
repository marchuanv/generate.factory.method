const { Content } = require('C:\\component\\lib\\content.js');
function createContent({ encryption,data,metadata }) {
    return new Content({ encryption,data,metadata });
}
module.exports = { createContent };
