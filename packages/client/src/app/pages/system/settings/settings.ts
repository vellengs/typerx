import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { BaseComponent } from '@shared/base/base.component';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings.html',
    styles: []
})
export class SettingsPageComponent extends BaseComponent implements OnInit {

    systemLogUrl;
    recover = 0;
    systemName;
    loading = false;
    title = '设置管理';

    @Input() domain = 'setting';

    active = 1;
    profileForm: FormGroup;
    pwd = {
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    };
    // Email
    primary_email = 'vellengs@qq.com';

    constructor(injector: Injector, fb: FormBuilder) {
        super(injector);
        this.profileForm = fb.group({
            name: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(`^[-_a-zA-Z0-9]{4,20}$`),
                ]),
            ],
            email: '',
            bio: [null, Validators.maxLength(160)],
            url: '',
            company: '',
            location: '',
        });
    }

    ngOnInit(): void {
        this.profileForm.patchValue({
            name: 'vellengs',
            email: 'vellengs@qq.com',
        });
    }

    get name() {
        return this.profileForm.get('name');
    }

    profileSave(event, value) {
        console.log('profile value', value);
    }

    pwdSave() {
        if (!this.pwd.old_password) {
            return this.msg.error('invalid old password');
        }
        if (!this.pwd.new_password) {
            return this.msg.error('invalid new password');
        }
        if (!this.pwd.confirm_new_password) {
            return this.msg.error('invalid confirm new password');
        }
        console.log('pwd value', this.pwd);
    }

    // async onRecoverChange() {
    //     await this.setSetting('recoverDays', this.recover);
    // }

    // async onSystemNameChange() {
    //     await this.setSetting('systemName', this.systemName);
    // }

    // async setSetting(key, value) {
    //     await this.client.put(
    //         'setting',
    //         {
    //             name: '系统名称',
    //             key: key,
    //             value: value
    //         }
    //     ).toPromise();
    // }

    // private getBase64(img: File, callback: (img: any) => void) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // }

    // async ngOnInit() {
    //     const items = await this.client.get<any[]>(
    //         'api/setting/main',
    //         {
    //             keys: 'systemName,systemLogUrl,recoverDays'
    //         }
    //     ).toPromise() || [];

    //     const settings: any = {};
    //     for (const setting of items) {
    //         settings[setting.key] = setting.value;
    //     }

    //     this.systemName = settings.systemName || '';
    //     this.systemLogUrl = settings.systemLogUrl || '';
    //     this.recover = settings.recoverDays || 30;
    // }

    // handleChange(info: { file: UploadFile }) {
    //     if (info.file.status === 'uploading') {
    //         this.loading = true;
    //         return;
    //     }

    //     if (info.file.status === 'done') {
    //         this.getBase64(info.file.originFileObj, async (img: any) => {
    //             this.loading = false;
    //             this.systemLogUrl = img;
    //             await this.setSetting('systemLogUrl', info.file.response.url);
    //         });
    //     }
    // }

}
