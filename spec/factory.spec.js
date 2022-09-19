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
            "name": scopeId,
            "primitiveArgs": {
            },
            "referenceArgs": {
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
