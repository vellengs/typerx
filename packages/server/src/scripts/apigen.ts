import axios from 'axios';
import * as path from 'path';
import * as https from 'https';
import * as zlib from 'zlib';
import * as fs from 'fs';
const unzip = require('unzip');
const rimraf = require('rimraf');

const gateway = 'https://generator.swagger.io/api/gen/clients/typescript-angular';

async function loadSwagger() {
    const jsonPath = path.resolve(process.cwd(), 'dist', 'swagger.json');
    const json = require(jsonPath);
    const client = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

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
}

async function sleep(ms: number) {
    await new Promise(resolve => setTimeout(
        () => resolve(true), ms));
}

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