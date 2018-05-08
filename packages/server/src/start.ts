


import { connect } from './database/connector';
import { ApiServer } from './server';
import * as dotenv from 'dotenv';
dotenv.config();
import { configure, getLogger } from 'log4js';
import { join } from 'path';
const cwd = process.cwd();
const config = join(cwd, 'log4js.debug.json');
configure(config);
const logger = getLogger();
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
connect(MONGODB_URI);
export const start = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const apiServer = new ApiServer();
        apiServer.start()
            .then(resolve)
            .catch(reject);

        const graceful = () => {
            apiServer.stop().then(() => process.exit(0));
        };

        process.on('SIGTERM', graceful);
        process.on('SIGINT', graceful);
    });
};
