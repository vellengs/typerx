import { InternalServer } from 'typescript-rest/dist/server-container';
import { ServiceClass, ServiceMethod } from 'typescript-rest/dist/metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpMethod, ServiceContext } from 'typescript-rest/dist/server-types';
import { operationLog, permissionCheck } from './interceptor';
import { Errors } from 'typescript-rest';

export class CustomInternalServer extends InternalServer {

    buildService(serviceClass: ServiceClass, serviceMethod: ServiceMethod) {
        const self: any = this;
        const handler = (req: Request, res: Response, next: NextFunction) => {

            serviceClass.processors = serviceClass.processors || [];
            serviceMethod.processors = serviceMethod.processors || [];

            const processors: Array<any> = [operationLog, permissionCheck];
            processors.concat(serviceClass.processors)
                .concat(serviceMethod.processors);

            self.runPreprocessors(processors, req)
                .then((request: any) =>
                    self.callTargetEndPoint(serviceClass, serviceMethod, request, res, next))
                .catch((err: any) => next(err));

        };

        if (!serviceMethod.resolvedPath) {
            InternalServer['resolveProperties'](serviceClass, serviceMethod);
        }

        const middleware: Array<RequestHandler> = self.buildServiceMiddleware(serviceMethod);
        let args: any[] = [serviceMethod.resolvedPath];
        args = args.concat(middleware);
        args.push(handler);
        switch (serviceMethod.httpMethod) {
            case HttpMethod.GET:
                this.router.get.apply(this.router, args);
                break;
            case HttpMethod.POST:
                this.router.post.apply(this.router, args);
                break;
            case HttpMethod.PUT:
                this.router.put.apply(this.router, args);
                break;
            case HttpMethod.DELETE:
                this.router.delete.apply(this.router, args);
                break;
            case HttpMethod.HEAD:
                this.router.head.apply(this.router, args);
                break;
            case HttpMethod.OPTIONS:
                this.router.options.apply(this.router, args);
                break;
            case HttpMethod.PATCH:
                this.router.patch.apply(this.router, args);
                break;

            default:
                throw Error(`Invalid http method for service [${serviceMethod.resolvedPath}]`);
        }
    }

}