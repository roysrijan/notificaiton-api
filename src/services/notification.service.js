//======= Send Notificaiton =======
exports.sendNotification = async (body) => {
    const notify = body;
    //socket.emit('notification', notify); // Updates Live Notification
    return notify;
};
