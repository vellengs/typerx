import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema, SFUISchema } from '@delon/form';

import { columnSets, formSets } from 'appearances/menu.appearance';

@Component({
    selector: 'app-menus-page',
    templateUrl: './menus.html',
    styles: []
})
export class MenusPageComponent implements OnInit {

    domain = 'menu';
    url = `api/menu/query`;
    params = {};

    columns: SimpleTableColumn[] = columnSets.default;
    schema: SFSchema = formSets.query;

    layout = 'inline';
    ui: SFUISchema = {
        grid: {
            span: 4
        }
    };

    // = {
    //     gutter: 2,
    //     span: 2,
    //     xl: {
    //         span: 5
    //     }


    constructor(public context: ListContext) {

    }

    async ngOnInit() {
        const config = await this.context.init(this.domain);
        console.log('config:', config);
    }

    submit(value: any) {

    }

}
