const { HttpMessageStatusFactory } = require('C:\\component\\lib\\http\\httpmessagestatus.factory.js');
[factoryVariableNames]
const messageStatusFactory = new MessageStatusFactory([refArgsVariableNames]);
const { MessageStatusFactory } = require('C:\\component\\lib\\messagestatus.factory.js');
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageStatusFactory = new MessageStatusFactory([refArgsVariableNames]);
    const messageStatus = messageStatusFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new HttpMessageStatusFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
