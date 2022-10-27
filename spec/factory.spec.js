xdescribe('when asking the factory for an instance given container context location', function() {
  it("it should load context script, find context config and return an instance of the ClientMessageBus", function() {

    // Arrange
    const { Factory } = require('C:\\component\\lib\\factory.js');
    const contextName = 'test';
    const factory = new Factory({
      "typeName": "ClientMessageBus",
      "typeVariableName": "clientMessageBus",
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "isSingleton": false,
      "contexts": [
          {
              "contextName": contextName,
              "factoryContainerContextScriptPath": "C://component//lib//factory//clientmessagebus.container.test.context.json"
          }
      ]
    });

    // Act
    const instance = factory.getInstance({ contextName });

    // Assert
    expect(instance).not.toBeNull();
  });

});

xdescribe('when asking the factory for an instance given all container contexts', function() {
  it("it should find context config and return an instance of the ClientMessageBus", function() {

    // Arrange
    const { Factory } = require('C:\\component\\lib\\factory.js');
    const contextName = 'test';
    const factory = new Factory({ 
      "typeName": "ClientMessageBus",
      "typeVariableName": "clientMessageBus",
      "typeScriptPath": "C://component//lib//clientmessagebus.js",
      "isSingleton": false,
      "contexts": [
        {
          "contextName": `${contextName}`,
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
    const instance = factory.getInstance({ contextName });

    // Assert
    expect(instance).not.toBeNull();
    
  });

});