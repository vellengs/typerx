import { async } from '@angular/core/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AjaxProxy } from '@core/proxy/ajax/ajax';
import { DetailComponent } from './../detail/detail.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { BaseListComponent } from '@shared/list/base.list';
import { NzTreeComponent } from 'ng-tree-antd';
import { ModalHelper } from '@delon/theme';
import { LocalStorageService } from 'angular-web-storage';

export interface CachedDict {
    [k: string]: string;
}

export class Dict {
    category: string;           // 字典类别
    name: string;             	// 键名
    translate: string;			// 显示名称
}

@Component({
    selector: 'app-list-search',
    templateUrl: './list.search.html'
})
export class ListSearchComponent extends BaseListComponent implements OnInit {

    @Input() domain = 'member';
    model: any = {};

    async ngOnInit() {
        super.ngOnInit();
    }

    searchChange(searchText?: string) {
        searchText = searchText || '';
        this.ajax.proxy.ajax({
            method: 'GET',
            url: `${this.domain}/search`,
            options: {
                params: { keyword: searchText }
            }
        }).subscribe((res) => {
            if (res && res.length) {
                this.entries = res;
            }
        });
    }

    save(ev: any) {
        this.subject.next({ value: this.model, dialog: this.subject });
    }

}

