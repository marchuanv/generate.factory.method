const { createUserSecurity } = require('C:\\component\\lib\\factory\\usersecurity.factory.js');
describe('when asking the UserSecurity factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "userId": null
}
    // Act
    const {userSecurity} = createUserSecurity(scopeId,userId);
    // Assert
    expect(userSecurity).not.toBeNull();
  });
});
