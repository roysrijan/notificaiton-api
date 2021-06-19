const socket = require('socket.io');
let s = null;

exports.useSocket = (server,params) => {
    
    s = socket(server,params);
    // On every Client Connection
    s.on('connection', socket => {
        console.log('Socket: client connected');
    });

    return s
};

exports.reuseSocket = () => {
    return s
};