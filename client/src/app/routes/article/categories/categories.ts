import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AjaxProxy } from '@core/proxy/ajax/ajax';
import { DetailComponent } from '@shared/detail/detail.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BaseListComponent } from '@shared/list/base.list';
import { TreeListComponent } from '@shared/selector/tree.list';
import { NzTreeComponent } from 'ng-tree-antd';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories.html'
})
export class CategoriesPageComponent extends BaseListComponent implements OnInit {

    domain = 'category';
    keyword = '';
    nodes = [];

    options = {
        allowDrag: false,
        animateSpeed: 3000
    };

    @ViewChild(NzTreeComponent) tree: NzTreeComponent;
    filterNodes() {
        this.tree.treeModel.filterNodes(this.keyword);
        if (!this.keyword) {
            this.tree.treeModel.collapseAll();
        }
    }

    onTreeItemSelected(ev: any) {
        if (ev.eventName === 'focus') {
            this.queryParams = {
                category: ev.node.data.uid
            };
            this.reload(null, null);
        }
    }

    async ngOnInit() {
        const tree = await this.ajax.getCategoryTree();
        this.nodes = tree;
        this.preload();
    }

    searchQuery(ev: any) {

    }


}
