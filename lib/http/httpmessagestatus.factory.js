const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js'); 
function HttpMessageStatusFactory({ messageStatus }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpMessageStatus({ messageStatus });
    }});
} 
module.exports = { HttpMessageStatusFactory }; 
