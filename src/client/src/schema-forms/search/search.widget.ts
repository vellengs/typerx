import { HttpParams } from '@angular/common/http';
import { Component, AfterViewInit, OnChanges } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { AjaxProxy } from '@core/proxy/ajax/ajax';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-search-widget',
    templateUrl: 'search.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class SearchWidget extends BaseWidget implements AfterViewInit {

    constructor(
        private ajax: AjaxProxy,
    ) {
        super();
    }

    entries = [];

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        // this.searchChange();
        // 监视表单是否重置了，如果是，则清除当前控件值;
        this.formProperty.root.valueChanges.subscribe((newValue) => {
            if (Object.keys(newValue).length === 0) {
                this.control.setValue(null, {
                    emitEvent: false
                });
            }
        });
        if (this.control.value) {
            this.loadData(this.control.value);
        }

    }

    async loadData(uid: string) {
        const modelData = await this.ajax.proxy.get(`api/${this.schema.widget.domain}/` + uid).toPromise();
        this.entries.push(modelData);
    }

    openChange(open: boolean) {
        if (open) {
            this.searchChange('');
        }
    }

    searchChange(searchText?: string) {

        searchText = searchText || '';
        if (!this.schema.widget || !this.schema.widget.domain) {
            this.entries = this.entries || [];
            return;
        }

        const params = { keyword: searchText };

        if (this.schema.widget.params) {
            Object.assign(params, this.schema.widget.params);
        }

        this.ajax.proxy.ajax({
            method: 'GET',
            url: `${this.schema.widget.domain}/search`,
            options: {
                params: params
            }
        }).subscribe((res) => {
            if (res && res.length) {
                this.entries = res;
            }
        });

    }
}
