const { createUserSession } = require('C:\\component\\lib\\factory\\usersession.factory.js');
describe('when asking the UserSession factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId} = require('C:\\component\\spec\\factory\\usersession.factory.spec.variables.json');

    // Act
    const {userSession} = createUserSession({userId});
    // Assert
    expect(userSession).not.toBeNull();
  });
});
