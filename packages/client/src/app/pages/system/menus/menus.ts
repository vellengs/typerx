import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema, SFUISchema } from '@delon/form';

import { BaseListComponent } from '@shared/base/base.list.component';
import { BaseStandComponent } from '@shared/base/base.stand.component';
import { BaseTreeTableComponent } from '@shared/base/base.tree.table';
import * as arrayToTree from 'array-to-tree';

@Component({
    selector: 'app-menus-page',
    templateUrl: './menus.html',
    styles: []
})
export class MenusPageComponent extends BaseTreeTableComponent implements OnInit {

    cover;
    extra;

    @Input() domain = 'menu';
    expandDataCache = {};
    treeData = [];

    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.onConfigChanged.subscribe(() => {
            console.log('formSets', this.formSets);
        });
        this.load();
    }

    async load() {
        this.treeData = await this.getMenuTreeData();
        this.treeData.forEach(item => {
            this.expandDataCache[item.id] = this.convertTreeToList(item);
        });
    }

    async getMenuTreeData() {
        const url = `api/menu/query`;
        const params = Object.assign({
            size: '1000',
            isMenu: true
        }, this.queryParams);
        const res: any = await this.client.get(url, params).toPromise();
        const docs = res.list;
        const tree = arrayToTree(docs, {
            parentProperty: 'parent',
            customID: 'id'
        });
        return tree;
    }

    collapse(array, data, $event) {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.id === d.id);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root) {
        const stack = [], array = [], hashMap = {};
        stack.push({ ...root, level: 0, expand: true });

        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
                }
            }
        }

        return array;
    }

    visitNode(node, hashMap, array) {
        if (!hashMap[node.id]) {
            hashMap[node.id] = true;
            array.push(node);
        }
    }


    checkAll(value) {
        if (value) {
            this.treeData.forEach(data => data.checked = true);
        } else {
            this.treeData.forEach(data => data.checked = false);
        }
    }




}
