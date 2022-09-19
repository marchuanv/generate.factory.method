fdescribe('when', function() {
  const { Factory } = require('C:\\component\\lib\\factory.js');
  
  const scopeId = 'factoryTest';

  it("it should one", function() {

    // Arrange
    const factory = new Factory({
      "typeName": "ClientMessageBus",
      "isSingleton": false,
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "bindings": [
          {
              "name": "global",
              "bindingScriptPath": "C://component//lib//factory//clientmessagebus.container.global.binding.json"
          },
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
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "bindings": [
          {
            "name":"global",
            "primitiveArgs": {
              "scopeId": "global",
              "clientRequestMessageBus": null,
              "clientResponseMessageBus": null
            },
            "referenceArgs": {
                "messageConverter": {
                    "factoryMethod": "createMessageConverter",
                    "factoryScript": "C://component//lib//factory//messageconverter.factory.js"
                }
            },
            "instance": null
          },
          {
            "name": scopeId,
            "primitiveArgs": {
              "scopeId": scopeId,
              "clientRequestMessageBus": null,
              "clientResponseMessageBus": null
            },
            "referenceArgs": {
                "messageConverter": {
                    "factoryMethod": "createMessageConverter",
                    "factoryScript": "C://component//lib//factory//messageconverter.factory.js"
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
