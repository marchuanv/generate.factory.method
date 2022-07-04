[FactoryRequireScripts]
describe('when asking WebSocketConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new WebSocketConnectionFactory({ host,port });
    // Assert
    expect(instance).not.toBeNull();
  });
});
