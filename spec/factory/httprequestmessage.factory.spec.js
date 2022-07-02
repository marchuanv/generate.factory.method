const { HttpRequestMessageFactory } = require('D:\\component\\lib\\http\\httprequestmessage.factory.js');
[factoryVariableNames]


describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const message = null;
    // Act
    const instance = new HttpRequestMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
