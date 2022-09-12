const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.prototype.js');
const getHttpRequestMessageFactoryConfig = require('C:\\component\\lib\\factory\\httprequestmessage.factory.config.js');
/**
* IsSingleton: false 
* Create HttpRequestMessage 
* @param {scopeId,message}
*/
function createHttpRequestMessage({scopeId,message}) {
    const container = factory.getContainer({ scopeId, type: HttpRequestMessage, variableName:'httpRequestMessage', singleton: false });
    container.config(getHttpRequestMessageFactoryConfig());
    container.reference({message});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpRequestMessage };
