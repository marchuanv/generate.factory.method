[FactoryRequireScripts]
describe('when asking MessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new MessageStatusFactory({ code });
    // Assert
    expect(instance).not.toBeNull();
  });
});
