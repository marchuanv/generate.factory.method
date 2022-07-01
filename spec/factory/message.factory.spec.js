const { MessageFactory } = require('C:\\component\\lib\\message.factory.js');
[factoryVariableNames]
const contentFactory = new ContentFactory([refArgsVariableNames]);
const messageStatusFactory = new MessageStatusFactory([refArgsVariableNames]);
const { ContentFactory } = require('C:\\component\\lib\\content.factory.js');
const { MessageStatusFactory } = require('C:\\component\\lib\\messagestatus.factory.js');
describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const contentFactory = new ContentFactory([refArgsVariableNames]);
const messageStatusFactory = new MessageStatusFactory([refArgsVariableNames]);
    const content = contentFactory.create([nonRefArgsVariableNames]);
const messageStatus = messageStatusFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new MessageFactory({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
