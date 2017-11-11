'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
start_1.start()
    .catch((err) => {
    console.error(`Error starting server: ${err.message}`);
    process.exit(-1);
});
//# sourceMappingURL=index.js.map