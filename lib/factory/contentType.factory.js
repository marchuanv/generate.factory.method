const factory = require('./factory.js');

const { ContentType } = require('C:\\component\\lib\\contentType.js');
/**
* IsSingleton: false 
* Create ContentType 
* @param {name}
*/
function createContentType({ scopeId, name }) {
    const container = factory.createContainer({ scopeId, type: ContentType, variableName:'contentType', singleton: false });
    container.config({name});
    
    container.initialise();
    return container.references;
}
module.exports = { createContentType };
