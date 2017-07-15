/**
 * Created by Damitha on 6/30/2017.
 */
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const socketFactory = require('./../socketFactory/socket-factory');

//const ObjectID = require('mongodb').ObjectID;

const publicPath = path.join(__dirname, '../view');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.get('/main-notices', (req, res) => {
    res.sendFile(path.join(publicPath, 'main-notices.html'));
});

app.get('/create-regular', (req, res) => {
    res.sendFile(path.join(publicPath, 'create-regular.html'));
});

app.get('/create-temporary', (req, res) => {
    res.sendFile(path.join(publicPath, 'create-temporary.html'));
});

app.get('/create-advertisement', (req, res) => {
    res.sendFile(path.join(publicPath, 'create-advertisement.html'));
});

app.get('/create-event', (req, res) => {
    res.sendFile(path.join(publicPath, 'create-event.html'));
});

app.get('/edit-regular', (req, res) => {
    res.sendFile(path.join(publicPath, 'edit-regular.html'));
});

app.get('/edit-advertisement', (req, res) => {
    res.sendFile(path.join(publicPath, 'edit-advertisement.html'));
});

app.get('/edit-event', (req, res) => {
    res.sendFile(path.join(publicPath, 'edit-event.html'));
});


server.listen(port, () => {
    console.log('Server is up');
});



io.of('/main-notices', (socket) => {
    socketFactory.getMainNoticeSocket(io, socket);
});

io.of('/create-regular', (socket) => {
    socketFactory.getCreateRegularSocket(io, socket);
});

io.of('/create-temporary', (socket) => {
    socketFactory.getCreateTemporarySocket(io, socket);
});

io.of('/create-advertisement', (socket) => {
    socketFactory.getCreateAdvertisementSocket(io, socket);
});

io.of('/create-event', (socket) => {
    socketFactory.getCreateEventSocket(io, socket);
});

io.of('/edit-regular', (socket) => {
    socketFactory.getEditRegularSocket(io, socket);
});

io.of('/edit-advertisement', (socket) => {
    socketFactory.getEditAdvertisementSocket(io, socket);
});

io.of('/edit-event', (socket) => {
    socketFactory.getEditEventSocket(io, socket);
});
