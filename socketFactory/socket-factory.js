/**
 * Created by Damitha on 7/14/2017.
 */

const {MainNoticeSocket} = require('./../socket/main-notice-socket');

const {CreateRegularSocket} = require('./../socket/create-regular-socket');

const {CreateTemporarySocket}= require('./../socket/create-temporary-socket');

const {CreateAdvertisementSocket}= require('./../socket/create-adertisement-socket');

const {CreateEventSocket}= require('./../socket/create-event-socket');

const {EditRegularSocket} = require('./../socket/edit-regular-socket');

const {EditAdvertisementSocket}= require('./../socket/edit-advertisement-socket');

const {EditEventSocket} = require('./../socket/edit-event-socket');

const getMainNoticeSocket = (io, socket) => {
    return new MainNoticeSocket(io, socket);
};

const getCreateRegularSocket = (io, socket) => {
    return new CreateRegularSocket(io, socket);
};

const getCreateTemporarySocket = (io, socket) => {
    return new CreateTemporarySocket(io, socket);
};

const getCreateAdvertisementSocket = (io, socket) => {
    return new CreateAdvertisementSocket(io, socket);
};

const getCreateEventSocket = (io, socket) => {
    return new CreateEventSocket(io, socket);
};

const getEditRegularSocket = (io, socket) => {
    return new EditRegularSocket(io, socket);
};

const getEditAdvertisementSocket = (io, socket) => {
    return new EditAdvertisementSocket(io, socket);
};

const getEditEventSocket = (io, socket) => {
    return new EditEventSocket(io, socket);
};


module.exports = {
    getMainNoticeSocket,
    getCreateRegularSocket,
    getCreateTemporarySocket,
    getCreateAdvertisementSocket,
    getCreateEventSocket,
    getEditRegularSocket,
    getEditAdvertisementSocket,
    getEditEventSocket
};