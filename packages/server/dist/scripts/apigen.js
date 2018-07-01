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
const connector_1 = require("./../database/connector");
const secrets_1 = require("./../util/secrets");
connector_1.connect(secrets_1.MONGODB_URI);
const core_database_1 = require("../modules/core/core.database");
const unzip = require('unzip');
const rimraf = require('rimraf');
const swaggerParser = require("swagger-parser");
const gateway = 'https://generator.swagger.io/api/gen/clients/typescript-angular';
function upsertApi(jsonPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield swaggerParser.parse(jsonPath).then();
        let result = 0;
        const paths = Object.keys(api.paths);
        for (let url of paths) {
            if (url) {
                const item = api.paths[url];
                const methods = Object.keys(item);
                for (let method of methods) {
                    const entry = item[method];
                    const doc = {
                        name: (entry.description || ''),
                        method: url,
                        path: method + url,
                        version: api.info.version
                    };
                    const count = yield core_database_1.CoreDatabase.Api.findOneAndUpdate({ path: doc.path }, doc, { upsert: true, 'new': true }).exec();
                    if (count) {
                        result++;
                    }
                }
            }
        }
        console.log('completed upsert api ...');
    });
}
function loadSwagger() {
    return __awaiter(this, void 0, void 0, function* () {
        /** 读取 swagger.json 接口文档文件 */
        const jsonPath = path.resolve(process.cwd(), 'dist', 'swagger.json');
        const json = require(jsonPath);
        yield upsertApi(jsonPath);
        const client = axios_1.default.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        });
        /**
         * 提交 post 到服务器并获得下载链接
         */
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
            // 处理下载压缩包文件，解压并删除临时文件
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
        console.log('load swagger ...');
    });
}
/**
 * 若已经生成，则删除文件夹
 * @param folder 文件夹
 */
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