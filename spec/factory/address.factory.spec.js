const { createAddress } = require('C:\\component\\lib\\factory\\address.factory.js');
describe('when asking Address to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {host,port} = require('C:\component\spec\factory\address.factory.spec.variables.json');

    // Act
    const instance = createAddress({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
