import { MockProxy } from './../mock-proxy/mock-proxy';
// tslint:disable:no-console class-name
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpProxy } from '../http-proxy/http-proxy';
import * as arrayToTree from 'array-to-tree';

export interface LoginModel {
    username: string;
    password: string;
    remembeMe?: boolean;
}

@Injectable()
export class AjaxProxy {

    constructor(public proxy: MockProxy) {

    }

    async getCategoryTree() {
        const url = `category/query`;

        const res = await this.proxy.ajax({
            method: 'GET',
            url: url,
            options: {
                params: {
                    size: 1000
                }
            }
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
        return this.proxy.ajax({
            method: 'GET',
            url: url
        });
    }

    signIn(model: LoginModel) {
        return this.proxy.ajax({
            method: 'POST',
            url: 'api/login',
            mockJson: 'assets/data/profile.json',
            options: {
                body: model
            }
        });
    }

}
