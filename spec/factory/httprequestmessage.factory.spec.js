[FactoryRequireScripts]
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new HttpRequestMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
