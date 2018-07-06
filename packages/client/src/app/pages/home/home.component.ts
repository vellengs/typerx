import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { getTimeDistance, yuan } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
})
export class HomeComponent extends BaseStandComponent implements OnInit {

    ngOnInit() {

    }

}
