import { connect } from "./../database/connector";
import { MONGODB_URI } from "./../util/secrets";
import { connection, model, Document, Model } from 'mongoose';
import { CoreDatabase as Db } from "../modules/core/core.database";

connect(MONGODB_URI);
import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadJson(file: string) {
    const filePath = resolve(process.cwd(), `data/export.${file}.json`);
    if (existsSync(filePath)) {
        return require(filePath);
    }
    return [];
}

async function importData() {
    await Db.Dict.insertMany(loadJson('dicts'));
    await Db.Menu.insertMany(loadJson('menus'));
    await Db.Setting.insertMany(loadJson('settings'));
    await Db.Account.insertMany(loadJson('accounts'));
    console.log('done ....');
}

importData();