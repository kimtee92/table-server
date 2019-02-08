"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var guest_1 = require("./model/guest");
var TableServer = /** @class */ (function () {
    function TableServer() {
        this.addGuest = function (m) {
            var guest = new guest_1.default(m);
            guest.save(function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(guest);
                }
            });
        };
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    TableServer.prototype.createApp = function () {
        this.app = express();
        //put headers for cors
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    TableServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    TableServer.prototype.config = function () {
        this.port = process.env.PORT || TableServer.PORT;
    };
    TableServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    TableServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.app.get('/all', this.getAll);
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('guest', function (m) {
                console.log(JSON.stringify(m));
                _this.addGuest(m);
                _this.io.emit('guest', m);
            });
            socket.on('disconnect', function (m) {
                console.log('Client disconnected: ', JSON.stringify(m));
            });
        });
    };
    TableServer.prototype.getApp = function () {
        return this.app;
    };
    TableServer.prototype.getAll = function (req, res, next) {
        var guests = guest_1.default.find(function (err, guests) {
            if (err) {
                res.send("Error!");
            }
            else {
                res.send(guests);
            }
        });
    };
    TableServer.PORT = 8080;
    return TableServer;
}());
exports.TableServer = TableServer;
