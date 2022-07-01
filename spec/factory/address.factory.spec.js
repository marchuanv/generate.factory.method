const { AddressFactory } = require('C:\\component\\lib\\address.factory.js');
[factoryVariableNames]


describe('when asking Address to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const host = null;
const port = null;
    // Act
    const instance = new AddressFactory({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
