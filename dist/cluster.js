#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const os = require("os");
const start_1 = require("./start");
// tslint:disable:no-console
if (cluster.isMaster) {
    const n = os.cpus().length;
    console.log(`Starting child processes...`);
    for (let i = 0; i < n; i++) {
        const env = { processNumber: i + 1 };
        const worker = cluster.fork(env);
        worker.process['env'] = env;
    }
    cluster.on('online', function (worker) {
        console.log(`Child process running PID: ${worker.process.pid} PROCESS_NUMBER: ${worker.process['env'].processNumber}`);
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log(`PID ${worker.process.pid}  code: ${code}  signal: ${signal}`);
        const env = worker.process['env'];
        const newWorker = cluster.fork(env);
        newWorker.process['env'] = env;
    });
}
else {
    start_1.start()
        .catch((err) => {
        console.error(`Error starting server: ${err.message}`);
        process.exit(-1);
    });
}
process.on('uncaughtException', function (err) {
    console.log(err);
});
//# sourceMappingURL=cluster.js.map