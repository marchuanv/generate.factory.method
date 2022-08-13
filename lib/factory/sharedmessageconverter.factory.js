const factory = require('./factory.js');

const { SharedMessageConverter } = require('D:\\component\\lib\\sharedmessageconverter.js');
/**
* Create SharedMessageConverter
* @param {}
*/
function createSharedMessageConverter({}) {
    const container = factory.createContainer({ type: SharedMessageConverter, variableName:'sharedMessageConverter', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedMessageConverter };
