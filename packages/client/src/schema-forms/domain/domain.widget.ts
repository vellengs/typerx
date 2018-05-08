import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ArrayLayoutWidget } from 'angular2-schema-form';
import { FormPropertyFactory } from 'angular2-schema-form/dist/model';
import { DetailComponent } from '@shared/detail/detail.component';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'app-domain-widget',
    templateUrl: 'domain.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class DomainWidget extends ArrayLayoutWidget implements OnInit, AfterViewInit {

    columns = [];
    entrySchema = {
        type: 'object',
        widget: 'entry',
        properties: {
            name: {
                type: 'string',
                title: '名称',
                required: true,
            },
        }
    };

    entry = {};

    constructor(
        private formPropertyFactory: FormPropertyFactory,
        public modalHelper: ModalHelper,
    ) {
        super();
    }

    ngOnInit(): void {
        const itemProp: any = this.formPropertyFactory.createProperty(this.formProperty.schema.items, null);
        itemProp.propertiesId.forEach((id) => {
            const name = this.formProperty.schema.items.properties[id].title;
            this.columns.push({ name: name });
        });
    }

    addItem() {
        this.formProperty.addItem();
    }

    removeItem(index: number) {
        this.formProperty.removeItem(index);
    }

    config(index: number) {

        this.modalHelper
            .open(DetailComponent, { schema: this.entrySchema, model: this.entry }, 360, {
                title: '编辑',
                footer: false,
                // isVisibleMiddle: true,
                style: {
                    top: '100px'
                },
                zIndex: 1001 // https://github.com/NG-ZORRO/ng-zorro-antd/issues/317
            })
            .subscribe(res => {
                // const item = Object.assign({ uid: entry.uid }, res.value);
                // this.ajax.proxy.put(`api/${this.domain}`, item).subscribe((result) => {
                //     this.message.info('保存成功');
                //     res.dialog.destroy();
                //     this.load();
                // });
            });
    }

    trackByIndex(index: number, item: any) {
        return index;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        console.log('ss:', this.formProperty);
    }

}
