const { createUserSecurity } = require('C:\\component\\lib\\factory\\generated\\usersecurity\\usersecurity.factory.js');
describe('when asking the UserSecurity factory to create an instance of UserSecurity', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "userId": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {userSecurity} = createUserSecurity(testInputArgs);

    // Assert
    expect(userSecurity).not.toBeNull();

  });
});
