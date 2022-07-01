const { HttpMessageQueueFactory } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js'); 
describe('when asking HttpMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    
    const {name,callback} = [];
    // Act
    const instance = new HttpMessageQueueFactory({ name,callback });
    // Assert
    expect(instance).not.toBeNull();
  });
});
