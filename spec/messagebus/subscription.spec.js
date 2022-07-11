const { Subscription } = require('../../lib/subscription');
describe("when receiving data", function() {
 it("it should notify all subscribers", function(done) {
  
  // Arrange
  let assertCallback;
  let callback = ({ from, data }) => assertCallback({ from, data });
  const subscription = new Subscription({ channelName: 'test' });
  subscription.onDataReceived({ callback });

  // Act
  setTimeout( async () => {
    await subscription.receiveData({
      from: 'localhost:4000',
      data:'hello world'
    });
  },1000);

  // Assert
  assertCallback = ({ from, data }) => {
    expect(data).toEqual('hello world');
    expect(from).toEqual('localhost:4000');
    done();
  };

 })
});
