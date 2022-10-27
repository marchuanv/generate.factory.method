const { factory } = require('../../factory.js');
const { existsSync } = require('fs');

/**
* Create MessageContentMetadata
* @param {data,factoryContainerBindingName}
*/
function createMessageContentMetadata({data,factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    if (!existsSync(bindingFilePath)) {
         throw new Error(`${bindingFilePath} does not exist.`);
    }
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {data} });
}
module.exports = { createMessageContentMetadata };
