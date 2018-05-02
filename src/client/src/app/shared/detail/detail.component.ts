import { Component, Input, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, NzModalSubject } from 'ng-zorro-antd';

@Component({
    selector: 'app-module-detail',
    templateUrl: './detail.component.html',
    styles: ['']
})
export class DetailComponent implements OnInit {

    @Input() schema: any;


    value: any = {};
    showFooter = true;

    constructor(
        public model: NzModalService,
        public msg: NzMessageService,
        public subject: NzModalSubject) {

    }

    ngOnInit(): void {
        // this.tabs[0].onSelected();
        if (this.schema && this.schema.widget) {
            const widgetId = this.schema.widget.id;
            if ('steps'.indexOf(widgetId) > -1) {
                this.showFooter = false;
            }
        }

    }

    save(event?) {
        this.subject.next({ value: this.value, dialog: this.subject });
    }

    cancel(event?) {
        this.subject.destroy('onCancel');
    }
}
