"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = require("./../database/connector");
const secrets_1 = require("./../util/secrets");
const data_install_1 = require("./data.install");
connector_1.connect(secrets_1.MONGODB_URI);
data_install_1.Installer.initData(process.cwd());
//# sourceMappingURL=data.import.js.map