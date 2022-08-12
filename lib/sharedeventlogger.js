function SharedEventLogger() {
    let logs = [];
    let isLogging = false;
    Object.defineProperty(this, 'log', { configurable: false, writable: false, value: ({ date, event }) => {
        const promise = new Promise((resolve) => {
            isLogging = true;
            const currentDate = date.toLocaleTimeString()  + `.${date.getMilliseconds()}`;
            logs.push({ date: currentDate, event });
            isLogging = false;
            resolve();
            const intervalId = setInterval(() => {
                if (!isLogging) {
                    logs = logs.sort(function(log1, log2){
                        // Turn your strings into dates, and then subtract them
                        // to get a value that is either negative, positive, or zero.
                        return new Date(log2.date) - new Date(log1.date);
                    });
                    let log = logs.shift();
                    while(log) {
                        const { name, source } = log.event;
                        console.log(`${log.date}: ${name} was published by ${source}`);
                        log = logs.shift();
                    }
                    clearInterval(intervalId);
                }
            }, 1000);
        });
        return promise;
    }});
};
SharedEventLogger.prototype.log = function({ date, event }) { };
module.exports = { SharedEventLogger };