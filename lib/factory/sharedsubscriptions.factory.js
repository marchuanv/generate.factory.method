const factory = require('./factory.js');

const { SharedSubscriptions } = require('D:\\component\\lib\\sharedsubscriptions.js');
/**
* Create SharedSubscriptions
* @param {}
*/
function createSharedSubscriptions({}) {
    const container = factory.createContainer({ type: SharedSubscriptions, variableName:'sharedSubscriptions', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedSubscriptions };
