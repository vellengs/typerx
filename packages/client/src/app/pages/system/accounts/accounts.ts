import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile, NzTreeNode } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
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

    nodes = [];
    expandKeys = [];
    searchValue = '';
    selectedItem: any = {};

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
                return {
                    title: item.name,
                    key: item.id,
                    parent: item.parent,
                    id: item.id,
                    isLeaf: items.findIndex(r => r.id === item.id) > 0
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


    mouseAction(name: string, e: any): void {

        console.log('mouseAction:', e);

        if (e && e.node) {
            this.selectedItem = e.node;
        }
    }

}
