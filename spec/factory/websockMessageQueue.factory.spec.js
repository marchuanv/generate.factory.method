[FactoryRequireScripts]
describe('when asking WebsockMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new WebsockMessageQueueFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
