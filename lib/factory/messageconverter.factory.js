const factory = require('./factory.js');

const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
/**
* IsSingleton: false 
* Create MessageConverter 
* @param {scopeId}
*/
function createMessageConverter({scopeId}) {
    let container = factory.getContainer({ scopeId, type: MessageConverter, variableName:'messageConverter' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: MessageConverter, variableName:'messageConverter', singleton: false });
        container.config({scopeId});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageConverter };
