const factory = require('./factory.js');

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
/**
* IsSingleton: true 
* Create MessageConverter 
* @param {}
*/
function createMessageConverter({}) {
    const container = factory.createContainer({ type: MessageConverter, variableName:'messageConverter', singleton: true });
    container.config({});
    
    container.initialise();
    return container.references;
}
module.exports = { createMessageConverter };
