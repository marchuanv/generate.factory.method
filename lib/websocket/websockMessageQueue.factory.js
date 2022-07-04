const utils = require('utils');
const { WebsockMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function WebsockMessageQueueFactory({  }) {
    utils.createProperty(this, 'create', () => {
        return new WebsockMessageQueue({  });
    });
}
module.exports = { WebsockMessageQueueFactory };
