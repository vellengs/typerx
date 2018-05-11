import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings.html',
    styles: []
})
export class SettingsPageComponent implements OnInit {
    systemLogUrl;
    recover = 0;
    systemName;
    loading = false;

    constructor(public client: _HttpClient) {

    }

    async onRecoverChange() {
        await this.setSetting('recoverDays', this.recover);
    }

    async onSystemNameChange() {
        await this.setSetting('systemName', this.systemName);
    }

    async setSetting(key, value) {
        await this.client.put(
            'setting',
            {
                name: '系统名称',
                key: key,
                value: value
            }
        ).toPromise();
    }

    private getBase64(img: File, callback: (img: any) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    async ngOnInit() {
        const items = await this.client.get<any[]>(
            'setting/main',
            {
                keys: 'systemName,systemLogUrl,recoverDays'
            }
        ).toPromise() || [];

        const settings: any = {};
        for (const setting of items) {
            settings[setting.key] = setting.value;
        }

        this.systemName = settings.systemName || '';
        this.systemLogUrl = settings.systemLogUrl || '';
        this.recover = settings.recoverDays || 30;
    }

    handleChange(info: { file: UploadFile }) {
        if (info.file.status === 'uploading') {
            this.loading = true;
            return;
        }

        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, async (img: any) => {
                this.loading = false;
                this.systemLogUrl = img;
                await this.setSetting('systemLogUrl', info.file.response.url);
            });
        }
    }

}
