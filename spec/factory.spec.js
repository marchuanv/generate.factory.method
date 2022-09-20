describe('when asking the factory for an instance given container binding location', function() {
  it("it should load binding script, find binding config and return an instance of the ClientMessageBus", function() {

    // Arrange
    const { Factory } = require('C:\\component\\lib\\factory.js');
    const factoryContainerBindingName = 'test';
    const factory = new Factory({
      "typeName": "ClientMessageBus",
      "typeVariableName": "clientMessageBus",
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "isSingleton": false,
      "bindings": [
          {
              "factoryContainerBindingName": factoryContainerBindingName,
              "factoryContainerBindingScriptPath": "C://component//lib//factory//clientmessagebus.container.test.binding.json"
          }
      ]
    });

    // Act
    const instance = factory.getInstance({ factoryContainerBindingName });

    // Assert
    expect(instance).not.toBeNull();
  });

});

describe('when asking the factory for an instance given all container bindings', function() {
  it("it should find binding config and return an instance of the ClientMessageBus", function() {

    // Arrange
    const { Factory } = require('C:\\component\\lib\\factory.js');
    const factoryContainerBindingName = 'test';
    const factory = new Factory({ 
      "typeName": "ClientMessageBus",
      "typeVariableName": "clientMessageBus",
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "isSingleton": false,
      "bindings": [
        {
          "factoryContainerBindingName": `${factoryContainerBindingName}`,
          "primitiveArgs": {
              "clientRequestMessageBus": null,
              "clientResponseMessageBus": null
          },
          "referenceArgs": {
              "messageConverter": {
                  "factoryContainerName": "messageConverterFactoryContainer",
                  "factoryContainerFilePath": "C://component//lib//factory//messageconverter.factory.container.json"
              }
          },
          "instance": null
        }
      ]
    });

    // Act
    const instance = factory.getInstance({ factoryContainerBindingName });

    // Assert
    expect(instance).not.toBeNull();
    
  });

});