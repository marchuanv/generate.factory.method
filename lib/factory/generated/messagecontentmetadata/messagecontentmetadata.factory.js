const { factory } = require('../../factory.js');

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
    const container = factory.getContainer({ bindingFilePath: bindings[factoryContainerBindingName], defaultBindingFilePath: bindings['Default'] });
    return container.getInstance({ ctorArgs: {data} });
}
module.exports = { createMessageContentMetadata };
