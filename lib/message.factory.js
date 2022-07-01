const { Message } = require('C:\\component\\lib\\message.js'); 
function MessageFactory({ content,messageStatus }) {
    console.log('arguments: ',JSON.stringify(arguments[0]));
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new Message({ content,messageStatus });
    }});
} 
module.exports = { MessageFactory }; 
