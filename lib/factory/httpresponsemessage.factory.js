const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.prototype.js');
const getHttpResponseMessageFactoryConfig = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.config.js');
/**
* IsSingleton: false 
* Create HttpResponseMessage 
* @param {scopeId,message}
*/
function createHttpResponseMessage({scopeId,message}) {
    const container = factory.getContainer({ scopeId, type: HttpResponseMessage, variableName:'httpResponseMessage', singleton: false });
    container.config(getHttpResponseMessageFactoryConfig());
    container.reference({message});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpResponseMessage };
