import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile, NzTreeNode } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { BaseStandComponent } from '@shared/base/base.stand.component';
import * as treeify from 'array-to-tree';
@Component({
    selector: 'app-account-page',
    templateUrl: './accounts.html',
    styles: []
})
export class AccountsPageComponent extends BaseStandComponent implements OnInit {

    url;
    @Input() domain = 'group';
    @ViewChild('accountList') accounts: BaseStandComponent;

    nodes = [];
    expandKeys = [];
    searchValue = '';
    selectedItem: any = {};
    accountQueryParams: any = {};

    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.url = `api/${this.domain}/query`;
        this.onConfigChanged.subscribe(() => {

        });

        this.onEntriesLoaded.subscribe(() => {
            const items = this.entries || [];
            const raw = (items).map((item) => {
                const isLeaf = items.findIndex(r => r.parent === item.id) === -1;
                return {
                    title: item.name,
                    key: item.id,
                    parent: item.parent,
                    id: item.id,
                    isLeaf: isLeaf
                };
            });

            const treeData = treeify(raw, {
                parentProperty: 'parent',
                customID: 'id'
            }) || [];

            this.nodes = treeData.map(doc => {
                this.expandKeys.push(doc.id);
                return new NzTreeNode(doc);
            });
        });
        this.load();
    }

    addAccount() {
        this.accounts.add();
    }

    selectNode(name: string, e: any): void {

        if (e && e.node) {

            if (e.node.key === this.selectedItem.key) {
                this.selectedItem = {};
                this.accountQueryParams = {};
            } else {
                this.selectedItem = e.node;
                this.accountQueryParams.group = this.selectedItem.key;
                if (this.accounts) {
                    this.accounts.load();
                }
            }

        }
    }

}
