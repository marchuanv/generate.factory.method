const utils = require('utils');
const { MessageStore } = require('D:\\component\\lib\\messagestore.js');
function MessageStoreFactory({  }) {
    utils.createProperty(this, 'create', () => {
        return new MessageStore({  });
    });
}
module.exports = { MessageStoreFactory };
