const { HttpMessageQueueFactory } = require('D:\\component\\lib\\http\\httpmessagequeue.factory.js');

[factoryVariableNames]
const nameFactory = new undefinedFactory([refArgsVariableNames]);
const callbackFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking HttpMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const nameFactory = new undefinedFactory([refArgsVariableNames]);
const callbackFactory = new undefinedFactory([refArgsVariableNames]);
    
    const name = null;
const callback = null;
    // Act
    const instance = new HttpMessageQueueFactory({ name,callback });
    // Assert
    expect(instance).not.toBeNull();
  });
});
