const { Factory } = require('../factory.js');
const factory = new Factory();

const { ContentType } = require('C:\\component\\lib\\contentType.prototype.js');
const getContentTypeFactoryConfig = require('C:\\component\\lib\\factory\\contenttype.factory.config.js');
/**
* IsSingleton: false 
* Create ContentType 
* @param {scopeId,name}
*/
function createContentType({scopeId,name}) {
    const container = factory.getContainer({ scopeId, type: ContentType, variableName:'contentType', singleton: false });
    container.config(getContentTypeFactoryConfig());
    container.reference({name});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createContentType };
