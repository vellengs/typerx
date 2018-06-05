import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService, UploadFile, NzTreeNode } from 'ng-zorro-antd';
import { Component, OnInit, Injector, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { ListContext } from '../../../services/list.context';
import { SimpleTableColumn } from '@delon/abc';
import { SFSchema, SFGridSchema, SFUISchema } from '@delon/form';
import * as treeify from 'array-to-tree';
import { BaseComponent } from '@shared/base/base.component';
import { BaseStandComponent } from '@shared/base/base.stand.component';

@Component({
    selector: 'app-menus-page',
    templateUrl: './menus.html',
    styles: []
})
export class MenusPageComponent extends BaseStandComponent implements OnInit {


    @Input() domain = 'menu';

    nodes = [];
    expandKeys = [];
    searchValue = '';
    selectedItem: any = {};
    detailSchema: any = {};

    formData;

    operationColumn = {
        title: '操作区',
        width: '180px',
        buttons: [
            {
                text: '删除',
                type: 'del',
                click: (record: any) => {
                }
            },
            {
                text: '编辑',
                type: 'none',
                click: (record: any) => {
                }
            },
            {
                text: '更多',
                children: [
                    {
                        text: `过期`,
                        type: 'none',
                    },
                ]
            }
        ]
    };

    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        this.loadMenuTree();
        this.onConfigChanged.subscribe(() => {
            this.detailSchema = this.formSets.edit;
        });
    }


    async loadMenuTree() {
        const menuResponse = await this.coreService.menuQuery('', true, 0, 3000).toPromise();
        const items = menuResponse ? menuResponse.list : [];


        const raw = items.map((item) => {
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
    }


    treeNodeClick(name: string, e: any) {
        if (e.node.key === this.selectedItem.key) {

        } else {
            this.selectedItem = e.node;

            this.coreService.menuGet(e.node.key).subscribe((res) => {
                this.formData = res;
            });
        }
    }

    selectNode(name: string, e: any): void {
        if (name === 'contextmenu') {

        }
    }

    formChanged() {

    }

    onFormError(errors) {

    }

    removeMenu(item) {
        super.remove({
            id: item.key
        });
    }

    reload() {
        this.selectedItem = {};
        this.loadMenuTree();
    }

}
