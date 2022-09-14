const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
describe('when asking the UserSessions factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {userSessions} = createUserSessions(scopeId);
    // Assert
    expect(userSessions).not.toBeNull();
  });
});
