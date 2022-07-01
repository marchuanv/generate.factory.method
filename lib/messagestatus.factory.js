const { MessageStatus } = require('C:\\component\\lib\\messagestatus.js'); 
function MessageStatusFactory({ code }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new MessageStatus({ code });
    }});
} 
module.exports = { MessageStatusFactory }; 
