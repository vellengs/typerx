// tslint:disable:no-console class-name

import 'rxjs/add/operator/do';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import * as moment from 'moment';
import { SettingsService } from '@delon/theme';
import 'rxjs/add/operator/catch';

/**
 * 封装HttpClient，主要解决：
 * + 优化HttpClient在参数上便利性
 * + 统一实现 loading
 * + 统一处理时间格式问题
 */
@Injectable()
export class HttpProxy {

    host: string;
    constructor(public settings: SettingsService, public http: HttpClient) {
        if (environment.host === 'self') {
            this.host = environment.host = `${location.protocol}//${location.host}`;
        } else {
            this.host = environment.host;
        }
    }

    private _loading = false;

    /** 是否正在加载中 */
    get loading(): boolean {
        return this._loading;
    }

    parseParams(params: any): HttpParams {
        let ret = new HttpParams();
        if (params) {
            // tslint:disable-next-line:forin
            for (const key in params) {
                let _data = params[key];
                // 将时间转化为：时间戳 (秒)
                if (moment.isDate(_data)) {
                    _data = moment(_data).unix();
                }
                ret = ret.set(key, _data);
            }
        }
        return ret;
    }

    private begin() {
        console.time('http');
        this._loading = true;
    }

    private end() {
        console.timeEnd();
        this._loading = false;
    }


    request(method: string, url: string, options?: any) {

        if (options && options.params) {
            options.params = this.parseParams(options.params);
        }

        this.begin();
        return this.http.request(method, url, options)
            .do(() => this.end())
            .catch((res) => {
                this.end();
                return res;
            });
    }

    /**
     * GET请求
     *
     * @param {string} url URL地址
     * @param {*} [params] 请求参数
     */
    get(url: string, params?: any): Observable<any> {
        this.begin();
        // console.log('url...:', url);

        return this.http.get(url);
        // return this.http
        //     .get(url, {
        //         params: this.parseParams(params)
        //     })
        //     .do(() => this.end())
        //     .catch((res) => {
        //         this.end();
        //         return res;
        //     });
    }

    /**
     * POST请求
     *
     * @param {string} url URL地址
     * @param {*} [body] body内容
     * @param {*} [params] 请求参数
     */
    post(url: string, body?: any, params?: any): Observable<any> {
        this.begin();
        return this.http
            .post(url, body || null, {
                params: this.parseParams(params)
            })
            .do(() => this.end())
            .catch((res) => {
                this.end();
                return res;
            });
    }

    /**
    * POST请求
    *
    * @param {string} url URL地址
    * @param {*} [body] body内容
    * @param {*} [params] 请求参数
    */
    put(url: string, body?: any, params?: any): Observable<any> {
        this.begin();
        return this.http
            .put(url, body || null, {
                params: this.parseParams(params)
            })
            .do(() => this.end())
            .catch((res) => {
                this.end();
                return res;
            });
    }

    /**
     * DELETE请求
     *
     * @param {string} url URL地址
     * @param {*} [params] 请求参数
     */
    delete(url: string, params?: any): Observable<any> {
        this.begin();
        return this.http
            .delete(url, {
                params: this.parseParams(params)
            })
            .do(() => this.end())
            .catch((res) => {
                this.end();
                return res;
            });
    }
}
