const factory = require('./factory.js');

const { ContentType } = require('C:\\component\\lib\\contentType.js');
/**
* Create ContentType
* @param {name}
*/
function createContentType({name}) {
    const container = factory.createContainer({ type: ContentType, variableName:'contentType', singleton: false });
    container.config({name});
    
    container.complete();
    return container.references;
}
module.exports = { createContentType };
