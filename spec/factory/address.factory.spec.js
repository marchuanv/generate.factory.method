const { createAddress } = require('C:\\component\\lib\\address.factory.js');
describe('when asking Address to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const host = 'localhost';

const port = 3000;

    // Act
    const instance = createAddress({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
