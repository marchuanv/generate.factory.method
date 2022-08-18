const factory = require('./factory.js');

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
/**
* Create MessageConverter
* @param {}
*/
function createMessageConverter({}) {
    const container = factory.createContainer({ type: MessageConverter, variableName:'messageConverter', singleton: false });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createMessageConverter };
