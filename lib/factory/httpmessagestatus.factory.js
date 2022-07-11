const { FactoryContainer } = require('./factory.container.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { HttpMessageStatus } = require('C:\\component\\lib\\http\\httpmessagestatus.js');
function createHttpMessageStatus({messageStatusCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({messageStatusCode});
    factoryContainer.add(createMessageStatus({messageStatusCode}));
    const httpMessageStatus = new HttpMessageStatus(factoryContainer);
    factoryContainer.add({httpMessageStatus});
    return factoryContainer;
}
module.exports = { createHttpMessageStatus };
