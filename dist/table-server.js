"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    TableServer.prototype.allGuest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('at get');
                        return [4 /*yield*/, guest_1.default.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TableServer.PORT = 8080;
    return TableServer;
}());
exports.TableServer = TableServer;
