const { factory } = require('../../factory.js');

/**
* Create MessageContentMetadata
* @param {data,factoryContainerBindingName}
*/
function createMessageContentMetadata({data,factoryContainerBindingName}) {
    const bindings = {
    "Default": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.default.binding.json",
    "MultipleRequestsSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "D://component//lib//factory//generated//messagecontentmetadata//messagecontentmetadata.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const bindingFilePath = bindings[factoryContainerBindingName];
    const binding = require(bindingFilePath);
    if (!binding) {
        throw new Error(`${factoryContainerBindingName} binding does not exist.`);
    }
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {data} });
}
module.exports = { createMessageContentMetadata };
