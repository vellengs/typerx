"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("./../util/secrets");
const data_install_1 = require("./data.install");
const installer = new data_install_1.Installer(secrets_1.MONGODB_URI);
installer.initData().then(() => {
    console.log('imported ...');
});
//# sourceMappingURL=data.import.js.map