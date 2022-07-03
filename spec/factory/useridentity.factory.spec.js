const { UserIdentityFactory } = require('D:\\component\\lib\\useridentity.factory.js');

[factoryVariableNames]
const userIdFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking UserIdentity to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const userIdFactory = new undefinedFactory([refArgsVariableNames]);
    
    const userId = null;
    // Act
    const instance = new UserIdentityFactory({ userId });
    // Assert
    expect(instance).not.toBeNull();
  });
});
