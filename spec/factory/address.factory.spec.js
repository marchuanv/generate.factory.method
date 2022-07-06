const { createAddress } = require('C:\\component\\lib\\factory\\address.factory.js');
describe('when asking Address to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const host = ;

const port = ;

    // Act
    const instance = createAddress({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
