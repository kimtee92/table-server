"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_server_1 = require("./table-server");
var app = new table_server_1.TableServer().getApp();
exports.app = app;
