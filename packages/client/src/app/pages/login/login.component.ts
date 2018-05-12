 import { Router } from '@angular/router';
import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-pages-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class CustomLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;
    count = 0;
    interval$: any;
    links;

    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        public userService: UserService,
        private settingsService: SettingsService
    ) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
    }

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    getCaptcha() {
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0) {
                clearInterval(this.interval$);
            }
        }, 1000);
    }

    async submit() {
        try {
            const res = await this.userService.login({
                username: this.userName.value,
                password: this.password.value
            });

            if (res) {
                this.router.navigate(['/']);
            } else {
                this.msg.error('账户名或密码无效, 登录失败');
            }
        } catch (ex) {
            console.log('error', ex);
        }
    }

    switch(event) {

    }

    ngOnDestroy(): void {
        if (this.interval$) {
            clearInterval(this.interval$);
        }
    }
}
