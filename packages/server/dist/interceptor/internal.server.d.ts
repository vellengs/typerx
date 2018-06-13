import { InternalServer } from 'typescript-rest/dist/server-container';
import { ServiceClass, ServiceMethod } from 'typescript-rest/dist/metadata';
export declare class CustomInternalServer extends InternalServer {
    buildService(serviceClass: ServiceClass, serviceMethod: ServiceMethod): void;
}
