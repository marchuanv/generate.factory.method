const { Content } = require('C:\\component\\lib\\content.js');
function createContent({ datametadata,encryption,data,metadata }) {
    return new Content({ datametadata,encryption,data,metadata });
}
module.exports = { createContent };
