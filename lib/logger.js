function Logger() {
    let logs = {};
    let isLogging = false;
    Object.defineProperty(this, 'log', { configurable: false, writable: false, value: ({ date, context, text }) => {
        const promise = new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (!isLogging) {
                    isLogging = true;
                    if (!logs[context]) {
                        logs[context] = [];
                    }
                    logs[context].push({ date, text });
                    resolve();
                    logs[context] = logs[context].sort((log1, log2) => {
                        return new Date(log1.date) - new Date(log2.date);
                    });
                    let log = logs[context].shift();
                    while(log) {
                        const { date, text } = log;
                        console.log(`${date.toISOString()}: ${context}, ${text}`);
                        log = logs[context].shift();
                    }
                    clearInterval(intervalId);
                    isLogging = false;
                }
            }, 1000);
        });
        return promise;
    }});
};
Logger.prototype.log = function({ date, event }) { };
module.exports = { Logger };