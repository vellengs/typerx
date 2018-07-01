import axios from 'axios';
import * as path from 'path';
import * as https from 'https';
import * as zlib from 'zlib';
import * as fs from 'fs';

import { connect } from "./../database/connector";
import { MONGODB_URI } from "./../util/secrets";
connect(MONGODB_URI);

import { CoreDatabase } from '../modules/core/core.database';
const unzip = require('unzip');
const rimraf = require('rimraf');
import * as swaggerParser from 'swagger-parser';
const gateway = 'https://generator.swagger.io/api/gen/clients/typescript-angular';

async function upsertApi(jsonPath: string) {
    const api = await swaggerParser.parse(jsonPath).then();
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
                }

                const count = await CoreDatabase.Api.findOneAndUpdate({ path: doc.path }, doc, { upsert: true, 'new': true }).exec();
                if (count) {
                    result++;
                }
            }
        }
    }
    console.log('completed upsert api ...');
}

async function loadSwagger() {

    /** 读取 swagger.json 接口文档文件 */
    const jsonPath = path.resolve(process.cwd(), 'dist', 'swagger.json');
    const json = require(jsonPath);

    await upsertApi(jsonPath);
    const client = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    /**
     * 提交 post 到服务器并获得下载链接
     */
    const result = await client.post(gateway, { spec: json });
    if (result.data && result.data.link) {
        const response = await client({
            method: 'GET',
            url: result.data.link,
            responseType: 'stream'
        })
        const local = path.resolve(process.cwd(), 'swagger.zip');
        const generatedFolder = path.resolve(process.cwd(), './../client/src/generated');
        const templateFolder = path.resolve(process.cwd(), 'decompress', 'typescript-angular-client');
        const decompress = path.resolve(process.cwd(), 'decompress');

        // 处理下载压缩包文件，解压并删除临时文件
        response.data.pipe(fs.createWriteStream(local)).on('finish', (done: any) => {
            fs.createReadStream(local).pipe(unzip.Extract({ path: 'decompress' })).on('close',
                async (done: any) => {
                    // await sleep(2000);
                    console.log('extracted ...');
                    fs.unlinkSync(local);
                    console.log('deleted zip file ...');
                    await removeFolder(generatedFolder);
                    console.log('removed generated ...');
                    // await sleep(1000);
                    fs.renameSync(templateFolder, generatedFolder);
                    console.log('copy generated ...');
                    await removeFolder(decompress);
                    console.log('done ...');
                });
        });
    }

    console.log('load swagger ...');
}

/**
 * 若已经生成，则删除文件夹
 * @param folder 文件夹
 */
async function removeFolder(folder: string) {
    if (fs.existsSync(folder)) {
        await new Promise((resolve) => {
            rimraf(folder, () => {
                resolve(true);
            });
        })
    }
}

loadSwagger();