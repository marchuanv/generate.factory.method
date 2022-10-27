const { factory } = require('../../factory.js');
const { existsSync } = require('fs');

/**
* Create ClassTest
* @param {testParam01,testParam02}
*/
function createClassTest({testParam01,testParam02}) {
    const contextFilePaths = ["D://generate.factory.method//output//classtest.factory.123456t.container.json","D://generate.factory.method//output//classtest.factory.js"];
    const contextFilePath = contextFilePaths.find(cfp => cfp.indexOf(contextName.toLowerCase()) > -1);
    if (!existsSync(contextFilePath)) {
         throw new Error(`${contextFilePath} does not exist.`);
    }
    const context = require(contextFilePath);
    if (!context) {
        throw new Error(`${contextName} context does not exist.`);
    }
    const container = factory.getContainer({ context });
    return container.getInstance({ ctorArgs: {testParam01,testParam02,contextName} });
}
module.exports = { createClassTest };
