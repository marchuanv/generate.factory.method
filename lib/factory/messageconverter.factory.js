const { FactoryContainer } = require('./factory.container.js');

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
function createMessageConverter({}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({});
    
    const messageConverter = new MessageConverter(factoryContainer);
    factoryContainer.add({messageConverter});
    return factoryContainer;
}
module.exports = { createMessageConverter };
