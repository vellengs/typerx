"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
class Start {
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const apiServer = new server_1.ApiServer();
                apiServer
                    .start()
                    .then(resolve)
                    .catch(reject);
                const graceful = () => {
                    apiServer.stop().then(() => process.exit(0));
                };
                process.on('SIGTERM', graceful);
                process.on('SIGINT', graceful);
            });
        });
    }
}
exports.Start = Start;
//# sourceMappingURL=start.js.map