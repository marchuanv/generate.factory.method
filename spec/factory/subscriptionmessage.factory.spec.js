const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
describe('when asking the SubscriptionMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {senderHost,senderPort,userId,data,token,messageStatusCode,channelName,metadata,recipientHost,recipientPort,Id} = require('C:\\component\\spec\\factory\\subscriptionmessage.factory.spec.variables.json');

    // Act
    const {subscriptionMessage} = createSubscriptionMessage({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName});
    // Assert
    expect(subscriptionMessage).not.toBeNull();
  });
});
