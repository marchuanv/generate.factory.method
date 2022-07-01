const { Content } = require('C:\\component\\lib\\content.js'); 
function ContentFactory({ data,metadata,encryption }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Content({ data,metadata,encryption });
    }});
} 
module.exports = { ContentFactory }; 
