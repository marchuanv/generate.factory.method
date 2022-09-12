const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
/**
* IsSingleton: false 
* Create MessageConverter 
* @param {scopeId}
*/
function createMessageConverter({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageConverter, variableName:'messageConverter', singleton: false });
    container.config({});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageConverter };
