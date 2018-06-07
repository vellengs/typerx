import { Component, Injector, Input, ViewChild, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/base/base.component';
import { NzModalRef, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
import { SimpleTableComponent } from '@delon/abc';
import * as treeify from 'array-to-tree';
import { isThisSecond } from 'date-fns';
import { UserService } from '@services/user.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { TreeData } from '../../../types/types';


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
export class BaseTreeSelectorComponent extends BaseComponent implements OnInit {

    modalRef: NzModalRef;

    @Input() multiple = true;
    @Input() showResults = true;
    @Input() queryUrl = '';
    @Input() columns;
    @Input() queryParams: any = {};
    @Input() asyncData: () => Observable<TreeData>;
    @ViewChild('treeView') treeView: NzTreeComponent;

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
    }

    ngOnInit() {
        this.asyncData().subscribe((res) => {
            this.nodes = res.nodes;
            this.expandKeys = res.expandKeys;
        });
    }

    save(event?) {
        // this.selectedNodes = [];
        // this.findChildNodes(this.nodes);
        // const selectedValue = this.multiple ? this.globalSelecteds : this.model;
        // this.subject.next({ value: selectedValue, dialog: this.subject });

        this.modalRef.destroy(this.selectedItems);
        // TODO 
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

    selectedChanged(event: any) {
        this.getAllCheckedItems();
    }

    getAllCheckedItems() {
        const stack = [...this.nodes], array = [], hashMap = {};

        while (stack.length !== 0) {
            const node = stack.pop();

            if (node.isLeaf && node.isChecked) {
                if (!hashMap[node.origin.id]) {
                    hashMap[node.origin.id] = true;
                    array.push(node);
                }
            }
            if (node.children && (node.isHalfChecked || node.isChecked)) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i]);
                }
            }
        }

        this.selectedItems = array.map((a) => {
            return a.origin;
        });
    }

    cancel(event?) {
        this.modalRef.destroy('onCancel');
    }

}
