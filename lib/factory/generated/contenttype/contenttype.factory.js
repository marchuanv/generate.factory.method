const { factory } = require('../../factory.js');
const { existsSync } = require('fs');

/**
* Create ContentType
* @param {name,contextName}
*/
function createContentType({name,contextName}) {
    const contexts = {
    "Default": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.default.context.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.multiplerequestsspec.context.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.usersecurityspec.context.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.clientcomponentspec.context.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.servercomponentspec.context.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.clientmessagebusspec.context.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.servermessagebusspec.context.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.httpserverresponsemessagebusspec.context.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//contenttype//contenttype.factory.container.httpclientrequestmessagebusspec.context.json"
};
    const contextFilePath = contexts[contextName];
    if (!existsSync(contextFilePath)) {
         throw new Error(`${contextFilePath} does not exist.`);
    }
    const context = require(contextFilePath);
    if (!context) {
        throw new Error(`${contextName} context does not exist.`);
    }
    const container = factory.getContainer({ context });
    return container.getInstance({ ctorArgs: {name} });
}
module.exports = { createContentType };
