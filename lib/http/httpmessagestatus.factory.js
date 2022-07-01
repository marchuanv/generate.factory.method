const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js'); 
function HttpMessageStatusFactory({ messageStatus }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpMessageStatus({ messageStatus });
    }});
} 
module.exports = { HttpMessageStatusFactory }; 
