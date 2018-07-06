import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ControlWidget, SFSchemaEnum, SFSchema, SFUISchemaItem, SFComponent, SFSchemaEnumType } from '@delon/form';
import { getData } from './../../util';
import { HttpClient } from '@angular/common/http';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import * as treeify from 'array-to-tree';

@Component({
    selector: 'sf-tree-selects',
    template:
        `<sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
    
<nz-tree-select 
    [ngModel]="value"
    (ngModelChange)="setValue($event)"
    [nzAllowClear]="i.allowClear"
    [nzPlaceHolder]="ui.placeholder"
    [nzDisabled]="disabled"
    [nzShowSearch]="i.showSearch"
    [nzDropdownMatchSelectWidth]="i.dropdownMatchSelectWidth"
    [nzMultiple]="i.multiple"	
    [nzSize]="ui.size"
    [nzCheckable]="i.checkable"
    [nzShowExpand] = "i.showExpand"
    [nzShowLine] = "i.showLine"
    [nzNodes]="nodes"
    [nzDefaultExpandAll]="i.defaultExpandAll"  
    [nzDefaultExpandedKeys]="i.defaultExpandKeys"
    (nzExpandChange)="treeExpandChanged($event)">
</nz-tree-select>

  </sf-item-wrap>`,
    preserveWhitespaces: false,
    styles: [
        `:host nz-select { min-width:110px; }
       `
    ]
})
export class TreeSelectWidgetComponent extends ControlWidget implements OnInit {
    /* 用于注册小部件 KEY 值 */
    static readonly KEY = 'tree-select';

    i: any;
    nodes: NzTreeNode[];
    hasGroup = false;

    constructor(
        @Inject(ChangeDetectorRef) public readonly cd: ChangeDetectorRef,
        @Inject(SFComponent) public readonly sfComp: SFComponent,
        public client: HttpClient,
    ) {
        super(cd, sfComp);
    }

    ngOnInit(): void {
        this.i = {
            allowClear: this.ui.allowClear,
            autoFocus: this.ui.autoFocus || false,
            dropdownClassName: this.ui.dropdownClassName || null,
            dropdownMatchSelectWidth: this.ui.dropdownMatchSelectWidth || true,
            serverSearch: this.ui.serverSearch || false,
            maxMultipleCount: this.ui.maxMultipleCount || Infinity,
            multiple: this.schema.type === 'array',
            showExpand: this.ui.showExpand || true,
            checkable: this.ui.checkable,
            showLine: this.ui.showLine || false,
            defaultExpandAll: this.ui.defaultExpandAll || false,
            mode: this.ui.mode || 'default',
            notFoundContent: this.ui.notFoundContent || '无法找到',
            showSearch: this.ui.showSearch || true,
            defaultExpandKeys: this.ui.defaultExpandKeys || [],
        };
    }

    getRemoteData(value: string, text?: string): Observable<SFSchemaEnumType[]> {
        const domain = this.ui.domain;
        const url = `api/${domain}/search`;
        return this.client.get(url, {
            params: {
                keyword: text || '',
                value: value
            }
        }) as any;
    }

    reset(value: any) {
        const self = this;
        self.ui.asyncData = () => self.getRemoteData(value);
        self.ui.onSearch = (text: string) => self.getRemoteData(value, text);
        getData(self.schema, self.ui, self.formProperty.formData).subscribe(
            list => {
                self.nodes = self.convertToTree(list);
                self.detectChanges();
            },
        );
    }

    convertToTree(array: Array<any>): Array<NzTreeNode> {
        const items = array.map((item) => {
            return {
                title: item.name,
                key: item.id,
                parent: item.parent,
                id: item.id,
            };
        });

        const tree = treeify(items, {
            parentProperty: 'parent',
            customID: 'id'
        }) || [];

        return tree.map((item) => {
            return new NzTreeNode(item);
        });
    }

    openChange(value: any) {
        if (this.ui.openChange) this.ui.openChange(value);
    }

    treeExpandChanged(e: NzFormatEmitEvent) {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
            // this.loadNode().then(data => {
            //     e.node.addChildren(data);
            // });
        }
    }

    searchChange(text: string) {
        if (this.ui.onSearch) {
            this.ui.onSearch(text).subscribe((res: any[]) => {
                this.nodes = res;
                this.detectChanges();
            });
            return;
        }
        this.detectChanges();
    }

}
