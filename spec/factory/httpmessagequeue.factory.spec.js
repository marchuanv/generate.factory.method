const { HttpMessageQueueFactory } = require('D:\\component\\lib\\http\\httpmessagequeue.factory.js');
[factoryVariableNames]


describe('when asking HttpMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const name = null;
const callback = null;
    // Act
    const instance = new HttpMessageQueueFactory({ name,callback });
    // Assert
    expect(instance).not.toBeNull();
  });
});
