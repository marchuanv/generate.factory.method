const { Content } = require('C:\\component\\lib\\content.js'); 
function ContentFactory({ data,metadata,encryption }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Content({ data,metadata,encryption });
    }});
} 
module.exports = { ContentFactory }; 
