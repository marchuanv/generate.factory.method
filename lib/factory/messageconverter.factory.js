const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.prototype.js');
const getMessageConverterFactoryConfig = require('C:\\component\\lib\\factory\\messageconverter.factory.config.js');
/**
* IsSingleton: false 
* Create MessageConverter 
* @param {scopeId}
*/
function createMessageConverter({scopeId}) {
    const container = factory.getContainer({ scopeId, type: MessageConverter, variableName:'messageConverter', singleton: false });
    container.config(getMessageConverterFactoryConfig());
    container.reference({});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageConverter };
