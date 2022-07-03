const { HttpMessageStatusFactory } = require('D:\\component\\lib\\http\\httpmessagestatus.factory.js');
const { MessageStatusFactory } = require('D:\\component\\lib\\messagestatus.factory.js');
[factoryVariableNames]
const messageStatusFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageStatusFactory = new undefinedFactory([refArgsVariableNames]);
    
    const messageStatus = null;
    // Act
    const instance = new HttpMessageStatusFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
