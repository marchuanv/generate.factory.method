const factory = require('./factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { Encryption } = require('C:\\component\\lib\\encryption.js');
function createEncryption({userId}) {
    const container = factory.createContainer({ type: Encryption, variableName:'encryption', singleton: false });
    container.config({userId});
    container.config(createUserIdentity({userId}));
    container.complete();
    return container.references;
}
module.exports = { createEncryption };
