import { HttpClient, HttpParams } from '@angular/common/http';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { AjaxProxy } from '@core/proxy/ajax/ajax';
import { DetailComponent } from '@shared/detail/detail.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BaseListComponent } from '@shared/list/base.list';

@Component({
    selector: 'app-articles-page',
    templateUrl: './articles.html'
})
export class ArticlesPageComponent extends BaseListComponent implements OnInit {

    domain = 'article';
    type = 0;

    async load(index?: number, size?: number) {
        index = index || this.pageIndex;
        size = size || this.pageSize;
        const params = Object.assign(this.queryParams,
            {
                page: index,
                size: size,
                type: this.type
            }
        );

        this.ajax.proxy.ajax({
            method: 'GET',
            url: `${this.domain}/query`,
            options: {
                params: params
            }
        }).subscribe((res) => {
            if (res) {
                this.entries = res.docs;
                this.total = res.total;
            }
        });
    }


    ngOnInit() {
        this.preload();
    }


    queryChange(event) {

    }

}
