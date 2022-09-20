fdescribe('when', function() {
  const { Factory } = require('C:\\component\\lib\\factory.js');
  
  const factoryContainerBindingName = 'test';

  it("it should one", function() {

    // Arrange
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

  it("it should two", function() {

    // Arrange
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
