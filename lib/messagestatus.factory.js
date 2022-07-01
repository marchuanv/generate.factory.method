const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js'); 
function MessageStatusFactory({ code }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageStatus({ code });
    }});
} 
module.exports = { MessageStatusFactory }; 
