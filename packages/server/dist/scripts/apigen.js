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
const axios_1 = require("axios");
const path = require("path");
const https = require("https");
const fs = require("fs");
const unzip = require('unzip');
const rimraf = require('rimraf');
const gateway = 'https://generator.swagger.io/api/gen/clients/typescript-angular';
function loadSwagger() {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonPath = path.resolve(process.cwd(), 'dist', 'swagger.json');
        const json = require(jsonPath);
        const client = axios_1.default.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        const result = yield client.post(gateway, { spec: json });
        if (result.data && result.data.link) {
            const response = yield client({
                method: 'GET',
                url: result.data.link,
                responseType: 'stream'
            });
            const local = path.resolve(process.cwd(), 'swagger.zip');
            const generatedFolder = path.resolve(process.cwd(), './../client/src/generated');
            const templateFolder = path.resolve(process.cwd(), 'decompress', 'typescript-angular-client');
            const decompress = path.resolve(process.cwd(), 'decompress');
            response.data.pipe(fs.createWriteStream(local)).on('finish', (done) => {
                fs.createReadStream(local).pipe(unzip.Extract({ path: 'decompress' })).on('close', (done) => __awaiter(this, void 0, void 0, function* () {
                    // await sleep(2000);
                    console.log('extracted ...');
                    fs.unlinkSync(local);
                    console.log('deleted zip file ...');
                    yield removeFolder(generatedFolder);
                    console.log('removed generated ...');
                    // await sleep(1000);
                    fs.renameSync(templateFolder, generatedFolder);
                    console.log('copy generated ...');
                    yield removeFolder(decompress);
                    console.log('done ...');
                }));
            });
        }
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(() => resolve(true), ms));
    });
}
function removeFolder(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync(folder)) {
            yield new Promise((resolve) => {
                rimraf(folder, () => {
                    resolve(true);
                });
            });
        }
    });
}
loadSwagger();
//# sourceMappingURL=apigen.js.map