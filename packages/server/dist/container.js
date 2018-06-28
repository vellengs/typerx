"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerService {
    static getAppearance(name) {
        return ContainerService.appearances[name];
    }
    static registerAppearance(name, appearance) {
        ContainerService.appearances[name] = appearance;
    }
}
ContainerService.appearances = {};
exports.ContainerService = ContainerService;
//# sourceMappingURL=container.js.map