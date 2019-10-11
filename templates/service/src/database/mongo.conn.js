"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var config_1 = require("config");
mongoose_1["default"].Promise = global.Promise;
var _a = config_1.get('mongo'), username = _a.username, password = _a.password, host = _a.host, port = _a.port, slave = _a.slave, replicaSet = _a.replicaSet, dbname = _a.dbname;
var options = {
    useNewUrlParser: true
};
// dsn
if (slave.length) {
    // cluster mode
    var dsn_1 = "mongodb://" + (username ? username + ":" + password + "@" : '') + host + ":" + port;
    slave.forEach(function (s) {
        dsn_1 += "," + s.host + ":" + s.port;
    });
    dsn_1 += "/" + dbname + "?replicaSet=" + replicaSet;
    mongoose_1["default"].connect(dsn_1, options);
}
else {
    // single
    var dsn = "mongodb://" + (username ? username + ":" + password + "@" : '') + host + ":" + port + "/" + dbname;
    mongoose_1["default"].connect(dsn, options);
}
exports["default"] = mongoose_1["default"];
