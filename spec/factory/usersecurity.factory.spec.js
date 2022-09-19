const { createUserSecurity } = require('C:\\component\\lib\\factory\\usersecurity.factory.js');
describe('when asking the UserSecurity factory to create an instance of UserSecurity', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null,
    "userId": null
};

    // Act
    const {userSecurity} = createUserSecurity(testInputArgs);

    // Assert
    expect(userSecurity).not.toBeNull();

  });
});
