const { MessageBusFactory } = require('../../lib/messagebusfactory');
describe("when publishing a message", function() {
 it("it should send the same message to all subscribers", function(done) {
  
  // Arrange
  let assertCallback;
  let callback = ({ from, data }) => assertCallback({ from, data });
  const channelName = 'messagebustest';
  const expectedData = 'hello from messagebus test';
  const messageBusFactory = new MessageBusFactory();
  const messageBus = messageBusFactory.createunsecure();
  messageBus.subscribe({ channelName, callback });
  //{ host: 'localhost', port: 3000 }
  // Act
  setTimeout( async () => {
    await messageBus.publish({ channelName, data: expectedData });
  },1000);

  // Assert
  assertCallback = ({ from, data }) => {
    expect(from).toEqual('localhost:3000');
    expect(data).toEqual(expectedData);
    done();
  };

 })
});
