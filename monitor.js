// Monitoring Setup
var cpuCur = 0;
var cpuHist = [];
var histLength = 45;
var interval = 1000;

// Get Params from another files
module.exports = function (server) {
    var os = require('os-utils')
    var io = require('socket.io')(server)

    // init monitoring
    for (let i = 0; i < histLength; i++) {
        cpuHist[i] = [i, 0];
    }

    // keep update
    setInterval(() => {
        os.cpuUsage((value) => {
            updateCPUHist(Math.round(value * 100))
            io.emit('cpu_histogram', cpuHist, cpuCur)
        })
    }, interval)

    function updateCPUHist(value) {
        cpuCur = value
        if (cpuHist.length >= histLength) {
            cpuHist.shift()
        }

        cpuHist.push([0, value])

        for (let i = 0; i < histLength; i++) {
            cpuHist[i][0] = i;
        }
    }
}