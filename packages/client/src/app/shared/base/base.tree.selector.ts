import { Component, Injector, Input, ViewChild } from '@angular/core';
import { BaseComponent } from '@shared/base/base.component';
import { NzModalRef, NzTreeNode } from 'ng-zorro-antd';
import { SimpleTableComponent } from '@delon/abc';
import * as treeify from 'array-to-tree';
import { isThisSecond } from 'date-fns';
import { UserService } from '@services/user.service';


@Component({
    selector: 'app-base-tree-selector',
    templateUrl: './base.tree.selector.html',
    styles: [
        `
        .anticon {
            padding-left: 4px;
            padding-right: 4px;
        }
        `
    ]
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

    constructor(
        public injector: Injector,
        public userService: UserService,

    ) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);
        this.loadTreeData();
    }

    async loadTreeData() {
        const treeData = await this.userService.treeUsers(true);
        this.nodes = treeData.nodes;
        this.expandKeys = treeData.expandKeys;
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
