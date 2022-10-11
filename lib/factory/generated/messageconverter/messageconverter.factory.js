const { factory } = require('../../factory.js');

/**
* Create MessageConverter
* @param {factoryContainerBindingName}
*/
function createMessageConverter({factoryContainerBindingName}) {
    const bindings = {
    "Default": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.default.binding.json",
    "MultipleRequestsSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.multiplerequestsspec.binding.json",
    "UserSecuritySpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.usersecurityspec.binding.json",
    "ClientComponentSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.clientcomponentspec.binding.json",
    "ServerComponentSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.servercomponentspec.binding.json",
    "ClientMessageBusSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.clientmessagebusspec.binding.json",
    "ServerMessageBusSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.servermessagebusspec.binding.json",
    "HttpServerResponseMessageBusSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.httpserverresponsemessagebusspec.binding.json",
    "HttpClientRequestMessageBusSpec": "C://component//lib//factory//generated//messageconverter//messageconverter.factory.container.httpclientrequestmessagebusspec.binding.json"
};
    const binding = require(bindings[factoryContainerBindingName]);
    const container = factory.getContainer({ binding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createMessageConverter };
