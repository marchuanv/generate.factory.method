const { FactoryContainer } = require('./factory.container.js');

const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js');
function createContentMetadata({metadata,data}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({metadata,data});
    
    const contentMetadata = new ContentMetadata(factoryContainer);
    factoryContainer.add({contentMetadata});
    return factoryContainer;
}
module.exports = { createContentMetadata };
