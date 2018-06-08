import { connect } from "./../database/connector";
import { MONGODB_URI } from "./../util/secrets";
import { connection, model, Document, Model } from 'mongoose';

connect(MONGODB_URI);
import { CoreDatabase as Db } from "../modules/core/core.database";
import { AccessService } from "../modules/core/access.service";

async function init() {
    let result = 0;
    const tags: any = AccessService.PermissionTags;
    const keys: string[] = Object.keys(tags);
    for (let key of keys) {
        const menu = {
            name: tags[key],
            slug: key,
            link: key,
            isMenu: false
        }

        const count = await Db.Menu.findOneAndUpdate({ link: menu.link }, menu, { upsert: true, 'new': true }).exec();
        if (count) {
            result++;
        }
    }
    console.log('result', result);
}

init();