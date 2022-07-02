const { HttpMessageStatusFactory } = require('D:\\component\\lib\\http\\httpmessagestatus.factory.js');
[factoryVariableNames]


describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const messageStatus = null;
    // Act
    const instance = new HttpMessageStatusFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
