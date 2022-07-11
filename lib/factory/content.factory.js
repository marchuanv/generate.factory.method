const { FactoryContainer } = require('./factory.container.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { Content } = require('C:\\component\\lib\\content.js');
function createContent({userId,data,metadata}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,data,metadata});
    factoryContainer.add(createEncryption({userId}));
    const content = new Content(factoryContainer);
    factoryContainer.add({content});
    return factoryContainer;
}
module.exports = { createContent };
