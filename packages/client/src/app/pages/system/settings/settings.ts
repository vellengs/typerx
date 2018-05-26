import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { BaseComponent } from '@shared/base/base.component';
import { FormSets } from '../../../../types/types';
import { SFComponent } from '@delon/form';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings.html',
    styles: []
})
export class SettingsPageComponent extends BaseComponent implements OnInit {

    title = '设置管理';
    @Input() domain = 'setting';
    active = 1;

    @Input() queryParams: { [key: string]: any; };
    @Input() formSets: FormSets;
    @ViewChild('profileForm') formRef: SFComponent;

    profileValue = {};
    profileData = {};

    constructor(injector: Injector) {
        super(injector);
        this.profileData = this.settings.user;
        this.coreService.settingGetConfig().subscribe((config) => {
            if (config && config.formSets) {
                this.formSets = config.formSets as any;
            }
        });
    }

    ngOnInit(): void {

    }

    reset() {
        this.formRef.reset();
    }

    formChanged($event) {
        this.profileValue = $event;
    }

    submit(event?) {

    }

    sysSettingFormChanged(event) {

    }

    profileFormChanged(event) {

    }

}
