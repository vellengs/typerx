"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_container_1 = require("typescript-rest/dist/server-container");
const server_types_1 = require("typescript-rest/dist/server-types");
const interceptor_1 = require("./interceptor");
class CustomInternalServer extends server_container_1.InternalServer {
    buildService(serviceClass, serviceMethod) {
        const self = this;
        const handler = (req, res, next) => {
            serviceClass.processors = serviceClass.processors || [];
            serviceMethod.processors = serviceMethod.processors || [];
            const processors = [interceptor_1.operationLog];
            processors.concat(serviceClass.processors)
                .concat(serviceMethod.processors);
            self.runPreprocessors(processors, req)
                .then((request) => self.callTargetEndPoint(serviceClass, serviceMethod, request, res, next))
                .catch((err) => next(err));
        };
        if (!serviceMethod.resolvedPath) {
            server_container_1.InternalServer['resolveProperties'](serviceClass, serviceMethod);
        }
        const middleware = self.buildServiceMiddleware(serviceMethod);
        let args = [serviceMethod.resolvedPath];
        args = args.concat(middleware);
        args.push(handler);
        switch (serviceMethod.httpMethod) {
            case server_types_1.HttpMethod.GET:
                this.router.get.apply(this.router, args);
                break;
            case server_types_1.HttpMethod.POST:
                this.router.post.apply(this.router, args);
                break;
            case server_types_1.HttpMethod.PUT:
                this.router.put.apply(this.router, args);
                break;
            case server_types_1.HttpMethod.DELETE:
                this.router.delete.apply(this.router, args);
                break;
            case server_types_1.HttpMethod.HEAD:
                this.router.head.apply(this.router, args);
                break;
            case server_types_1.HttpMethod.OPTIONS:
                this.router.options.apply(this.router, args);
                break;
            case server_types_1.HttpMethod.PATCH:
                this.router.patch.apply(this.router, args);
                break;
            default:
                throw Error(`Invalid http method for service [${serviceMethod.resolvedPath}]`);
        }
    }
}
exports.CustomInternalServer = CustomInternalServer;
//# sourceMappingURL=internal.server.js.map