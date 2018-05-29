import axios from 'axios';
import * as path from 'path';
import * as https from 'https';
import * as zlib from 'zlib';
import * as fs from 'fs';
const unzip = require('unzip-stream');

const gateway = 'https://generator.swagger.io/api/gen/clients/typescript-angular';
async function loadSwagger() {
    const jsonPath = path.resolve(process.cwd(), 'dist', 'swagger.json');
    const json = require(jsonPath);
    // console.log('json', json);
    const client = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    const result = await client.post(gateway, { spec: json });
    if (result.data && result.data.link) {
        // console.log('result.data.link', result.data.link);
        const response = await client({
            method: 'GET',
            url: result.data.link,
            responseType: 'stream'
        })

        const local = path.resolve(process.cwd(), 'swagger.zip');
        response.data.pipe(fs.createWriteStream(local));
    }
}

loadSwagger().catch((error) => {
    console.log('error:', error);
});