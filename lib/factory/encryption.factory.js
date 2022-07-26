const factory = require('./factory.js');

const { Encryption } = require('C:\\component\\lib\\encryption.js');
/**
* Create Encryption
* @param {userIdentity}
*/
function createEncryption({userIdentity}) {
    const container = factory.createContainer({ type: Encryption, variableName:'encryption', singleton: false });
    container.config({userIdentity});
    
    container.complete();
    return container.references;
}
module.exports = { createEncryption };
