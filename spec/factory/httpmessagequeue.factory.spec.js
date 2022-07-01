const { HttpMessageQueueFactoryFactory } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js'); 

describe('when asking HttpMessageQueueFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { name,callback } = [];
    // Act
    const instance = new HttpMessageQueueFactoryFactory({ name,callback });
    // Assert
    expect(instance).not.toBeNull();
  });
});
