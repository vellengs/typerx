import { BaseListComponent } from './base.list';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-common-list',
    templateUrl: './common.list.html'
})
export class CommonListComponent extends BaseListComponent implements OnInit {


}
