import { MONGODB_URI } from "./../util/secrets";
import { Installer } from "./data.install";
const installer = new Installer(MONGODB_URI);
installer.initData().then(() => {
    installer.drop();
});
