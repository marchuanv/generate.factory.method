const { factory } = require('../../factory.js');
const { existsSync } = require('fs');

/**
* Create HttpServerResponseMessageBus
* @param {contextName}
*/
function createHttpServerResponseMessageBus({contextName}) {
    const contexts = {
    "Default": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.default.context.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.multiplerequestsspec.context.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.usersecurityspec.context.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.clientcomponentspec.context.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.servercomponentspec.context.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.clientmessagebusspec.context.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.servermessagebusspec.context.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.httpserverresponsemessagebusspec.context.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//httpserverresponsemessagebus//httpserverresponsemessagebus.factory.container.httpclientrequestmessagebusspec.context.json"
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
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerResponseMessageBus };
