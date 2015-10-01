module.exports = function() {
    this.registerCron = function(timeInterval, handler) {
        setInterval(handler, timeInterval);
    };
};