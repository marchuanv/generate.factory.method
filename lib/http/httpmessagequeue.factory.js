const { HttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.js'); 
function HttpMessageQueueFactory({ name,callback }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new HttpMessageQueue({ name,callback });
    }});
} 
module.exports = { HttpMessageQueueFactory }; 
