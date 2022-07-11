const { FactoryContainer } = require('./factory.container.js');

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
function createMessageConverter({}) {
    let factoryContainer = new FactoryContainer();
    
    const messageConverter = new MessageConverter({});
    factoryContainer.add(messageConverter);
    return factoryContainer;
}
module.exports = { createMessageConverter };
