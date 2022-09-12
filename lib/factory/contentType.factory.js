const { Factory } = require('../factory.js');
const factory = new Factory();

const { ContentType } = require('C:\\component\\lib\\contentType.js');
/**
* IsSingleton: false 
* Create ContentType 
* @param {scopeId,name}
*/
function createContentType({scopeId,name}) {
    let container = factory.getContainer({ scopeId, type: ContentType, variableName:'contentType', singleton: false });
    container.config({name});
    
    container.ensureInstance();
    return container.references;
}
module.exports = { createContentType };
