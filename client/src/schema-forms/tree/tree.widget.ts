import { BaseWidget } from './../base.widget';
import { Component, ViewChild, OnInit } from '@angular/core';
import { generateData } from './generate-data';
import { NzTreeComponent } from 'ng-tree-antd';
import { ControlWidget } from 'angular2-schema-form';

@Component({
    selector: 'app-tree-widget',
    templateUrl: 'tree.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class TreeWidget extends BaseWidget implements OnInit {
    q = '';

    nodes = [];

    options = {
        allowDrag: false
    };

    @ViewChild(NzTreeComponent) tree: NzTreeComponent;
    filterNodes() {
      this.tree.treeModel.filterNodes(this.q);
      if (!this.q) {
        this.tree.treeModel.collapseAll();
      }
    }

    ngOnInit() {
      generateData(this.nodes, 3, 2, 1);
    }

    onEvent(ev: any) {
      console.log('basic', 'onEvent', ev);
    }
 }
