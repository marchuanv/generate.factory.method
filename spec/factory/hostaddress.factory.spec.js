const { createHostAddress } = require('C:\\component\\lib\\factory\\hostaddress.factory.js');
describe('when asking the HostAddress factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {host,port} = require('C:\\component\\spec\\factory\\hostaddress.factory.spec.variables.json');

    // Act
    const {hostAddress} = createHostAddress({host,port});
    // Assert
    expect(hostAddress).not.toBeNull();
  });
});
