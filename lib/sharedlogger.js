function SharedLogger() {
    let logs = [];
    let isLogging = false;
    Object.defineProperty(this, 'log', { configurable: false, writable: false, value: ({ date, text }) => {
        const promise = new Promise((resolve) => {
            isLogging = true;
            logs.push({ date, text });
            isLogging = false;
            resolve();
            const intervalId = setInterval(() => {
                if (!isLogging) {
                    logs = logs.sort((log1, log2) => {
                        return new Date(log1.date) - new Date(log2.date);
                    });
                    let log = logs.shift();
                    while(log) {
                        const { date, text } = log;
                        console.log(`${date.toISOString()}: ${text}`);
                        log = logs.shift();
                    }
                    clearInterval(intervalId);
                }
            }, 1000);
        });
        return promise;
    }});
};
SharedLogger.prototype.log = function({ date, event }) { };
module.exports = { SharedLogger };