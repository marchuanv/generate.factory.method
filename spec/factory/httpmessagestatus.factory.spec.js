[FactoryRequireScripts]
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new HttpMessageStatusFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
