const { createUserSessions } = require('C:\\component\\lib\\factory\\usersessions.factory.js');
describe('when asking the UserSessions factory to create an instance of UserSessions', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": null
};

    // Act
    const {userSessions} = createUserSessions(testInputArgs);

    // Assert
    expect(userSessions).not.toBeNull();

  });
});
