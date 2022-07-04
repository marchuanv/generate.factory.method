[FactoryRequireScripts]
describe('when asking UserIdentity to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new UserIdentityFactory({ userId });
    // Assert
    expect(instance).not.toBeNull();
  });
});
