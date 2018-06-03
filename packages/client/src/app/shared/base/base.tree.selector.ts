import { Component, Injector, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/base/base.component';
import { NzModalRef, NzTreeNode } from 'ng-zorro-antd';
import { SimpleTableComponent } from '@delon/abc';
import * as treeify from 'array-to-tree';
import { isThisSecond } from 'date-fns';


@Component({
    selector: 'app-base-tree-selector',
    templateUrl: './base.tree.selector.html'
})
export class BaseTreeSelectorComponent extends BaseComponent {
    modalRef: NzModalRef;

    @Input() multiple = true;
    @Input() queryUrl = '';
    @Input() domain = 'group';
    @Input() columns;
    @Input() queryParams: any = {};

    searchValue = '';
    nodes = [];
    expandKeys = [];
    model: any = {};
    selectedItems = [];
    selectNode = {};
    selectedItem: any = {};

    constructor(public injector: Injector) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);
        this.loadTreeData();
    }

    async loadTreeData() {

        const uri = `api/${this.domain}/query`;
        const dataResponse = await this.coreService.groupQuery(this.searchValue).toPromise();

        // await this.client.get(uri, {
        // }).toPromise();

        const items = dataResponse.list;

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
    }


    save(event?) {
        // this.selectedNodes = [];
        // this.findChildNodes(this.nodes);
        // const selectedValue = this.multiple ? this.globalSelecteds : this.model;
        // this.subject.next({ value: selectedValue, dialog: this.subject });
    }

    cleanAll() {

    }

    removeOne(item) {

    }

    treeNodeClick(name: string, e: any) {
        if (e.node.key === this.selectedItem.key) {

        } else {
            this.selectedItem = e.node;
        }
    }

    showContextMenu(name: string, e: any) {

    }

    nodeExpandChanged(name: string, e: any) {

    }

    cancel(event?) {
        this.modalRef.destroy('onCancel');
    }

}
