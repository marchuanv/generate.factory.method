const utils = require('utils');
const { HttpMessageQueue } = require('D:\\component\\lib\\http\\httpmessagequeue.js');
function HttpMessageQueueFactory({ name,callback }) {
    utils.createProperty(this, 'create', () => {
        return new HttpMessageQueue({ name,callback });
    });
}
module.exports = { HttpMessageQueueFactory };
