// tslint:disable:no-console class-name
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as arrayToTree from 'array-to-tree';

export interface LoginModel {
    username: string;
    password: string;
    rememberMe?: boolean;
}

@Injectable()
export class AjaxProxy {

    constructor(public client: HttpClient) {

    }

    async getCategoryTree() {
        const url = `category/query`;
        const params: any = {
            size: 5000
        };

        const res: any = this.client.get(url, {
            params: params
        }).toPromise();

        const docs = res.docs;
        const tree = arrayToTree(docs, {
            parentProperty: 'parent._id',
            customID: 'uid'
        });
        return tree;
    }

    getSchemaConfig(domain: string) {
        const url = `${domain}/config`;
        return this.client.get(url);
    }

    signIn(model: LoginModel) {
        const url = `api/login`;
        return this.client.post(url, {
            options: {
                body: model
            }
        });
    }

}
