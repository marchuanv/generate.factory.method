const { factory } = require('../../factory.js');
const { existsSync } = require('fs');

/**
* Create DepClassTest
* @param {}
*/
function createDepClassTest({}) {
    const contextFilePaths = ["D://generate.factory.method//output//depclasstest.factory.123456t.container.json","D://generate.factory.method//output//depclasstest.factory.js"];
    const contextFilePath = contextFilePaths.find(cfp => cfp.indexOf(contextName.toLowerCase()) > -1);
    if (!existsSync(contextFilePath)) {
         throw new Error(`${contextFilePath} does not exist.`);
    }
    const context = require(contextFilePath);
    if (!context) {
        throw new Error(`${contextName} context does not exist.`);
    }
    const container = factory.getContainer({ context });
    return container.getInstance({ ctorArgs: {contextName} });
}
module.exports = { createDepClassTest };
