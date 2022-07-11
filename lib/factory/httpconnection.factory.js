const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,userId,hostAddress}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,userId,hostAddress});
    factoryContainer.add(createMessageQueue({userId}));
    const httpConnection = new HttpConnection(factoryContainer);
    factoryContainer.add({httpConnection});
    return factoryContainer;
}
module.exports = { createHttpConnection };
