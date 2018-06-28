import { InternalServer } from 'typescript-rest/dist/server-container';
import { Router } from 'express';
import { CustomInternalServer } from './internal.server';

export class CustomRestServer {
    static buildServices(router: Router, ...types: any[]) {
        const internalServer: InternalServer = new CustomInternalServer(router);
        internalServer.buildServices(types);
    }
}