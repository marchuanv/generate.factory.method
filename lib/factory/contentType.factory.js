const factory = require('./factory.js');

const { ContentType } = require('C:\\component\\lib\\contentType.js');
/**
* IsSingleton: false 
* Create ContentType 
* @param {scopeId,name}
*/
function createContentType({scopeId,name}) {
    let container = factory.getContainer({ scopeId, type: ContentType, variableName:'contentType', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: ContentType, variableName:'contentType', singleton: false });
        container.config({scopeId,name});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createContentType };
