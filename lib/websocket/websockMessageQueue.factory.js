const { WebsockMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js'); 
function WebsockMessageQueueFactory({  }) {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: () => {
        return new WebsockMessageQueue({  });
    }});
} 
module.exports = { WebsockMessageQueueFactory }; 
