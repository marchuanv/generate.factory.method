const factory = require('./factory.js');

const { SharedEventSubscriptions } = require('C:\\component\\lib\\sharedeventsubscriptions.js');
/**
* Create SharedEventSubscriptions
* @param {}
*/
function createSharedEventSubscriptions({}) {
    const container = factory.createContainer({ type: SharedEventSubscriptions, variableName:'sharedEventSubscriptions', singleton: true });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedEventSubscriptions };
