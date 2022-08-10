const { createSharedUserSessions } = require('D:\\component\\lib\\factory\\sharedusersessions.factory.js');
describe('when asking the SharedUserSessions factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('D:\\component\\spec\\factory\\sharedusersessions.factory.spec.variables.json');

    // Act
    const {sharedUserSessions} = createSharedUserSessions({});
    // Assert
    expect(sharedUserSessions).not.toBeNull();
  });
});
