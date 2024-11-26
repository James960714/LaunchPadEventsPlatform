const mongoose = require('mongoose')

// Replace the uri string with your connection string.
function connection() {
    return mongoose
        .connect(
            `mongodb+srv://jsmilezz052:JustSmile@eventsplatformcluster.eherw.mongodb.net/EventsPlatformData?retryWrites=true&w=majority&appName=EventsPlatformCluster`)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log('connection failed', err);
        });
}

module.exports = connection