fdescribe('when', function() {
  const { Factory } = require('C:\\component\\lib\\factory.js');
  
  const scopeId = 'test';

  it("it should one", function() {

    // Arrange
    const factory = new Factory({
      "typeName": "ClientMessageBus",
      "typeVariableName": "clientMessageBus",
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "isSingleton": false,
      "bindings": [
          {
              "name": scopeId,
              "bindingScriptPath": "C://component//lib//factory//clientmessagebus.container.test.binding.json"
          }
      ]
    });

    // Act
    const instance = factory.getInstance({ scopeId });

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
          "name": "test",
          "primitiveArgs": {
              "scopeId": "test",
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
    const instance = factory.getInstance({ scopeId });

    // Assert
    expect(instance).not.toBeNull();
  });

});
