
const { createAddress } = require('C:\component\lib\address.factory.js');
describe('when asking Address to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new AddressFactory({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
