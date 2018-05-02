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
    selector: 'app-tree-list',
    templateUrl: './tree.list.html'
})
export class TreeListComponent extends BaseListComponent implements OnInit {

    @Input() domain = 'category';
    model: any = {};
    q = '';

    nodes = [];
    entries = [];

    options = {
        allowDrag: false,
        animateSpeed: 3000
    };

    @ViewChild(NzTreeComponent) tree: NzTreeComponent;
    filterNodes() {
        this.tree.treeModel.filterNodes(this.q);
        if (!this.q) {
            this.tree.treeModel.collapseAll();
        }
    }

    async ngOnInit() {
        const tree = await this.ajax.getCategoryTree();
        this.nodes = tree;
        super.ngOnInit();
    }


    onEvent(ev: any) {

        if (ev.eventName === 'focus') {
            this.queryParams = {
                category: ev.node.data.uid
            };
            this.reload(null, null);
        }

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

