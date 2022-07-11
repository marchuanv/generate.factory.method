const { FactoryContainer } = require('./factory.container.js');

const { ContentMetadata } = require('C:\\component\\lib\\contentmetadata.js');
function createContentMetadata({metadata,data}) {
    let factoryContainer = new FactoryContainer();
    
    const contentMetadata = new ContentMetadata({metadata,data});
    factoryContainer.add(contentMetadata);
    return factoryContainer;
}
module.exports = { createContentMetadata };
