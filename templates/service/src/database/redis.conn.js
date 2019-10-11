"use strict";
exports.__esModule = true;
var config_1 = require("config");
var ioredis_1 = require("ioredis");
var _a = config_1.get('redis'), host = _a.host, port = _a.port, db = _a.db;
exports["default"] = new ioredis_1["default"]({
    port: port,
    host: host,
    db: db
});
