import { Component, Injector, Input, ViewChild, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/base/base.component';
import { NzModalRef, NzTreeNode, NzTreeComponent, NzTransferComponent } from 'ng-zorro-antd';
import { SimpleTableComponent } from '@delon/abc';
import * as treeify from 'array-to-tree';
import { isThisSecond } from 'date-fns';
import { UserService } from '@services/user.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';


@Component({
    selector: 'app-transfer-selector',
    templateUrl: './transfer.selector.html',
})
export class TransferSelectorComponent extends BaseComponent implements OnInit {

    modalRef: NzModalRef;
    model: any = {};
    @ViewChild('transfer') transfer: NzTransferComponent;

    list = [];

    constructor(
        public injector: Injector
    ) {
        super(injector);
        this.modalRef = this.injector.get(NzModalRef);

    }

    ngOnInit() {
        const ret = [];
        for (let i = 0; i < 20; i++) {
            ret.push({
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                direction: Math.random() * 2 > 1 ? 'right' : ''
            });
        }
        this.list = ret;
    }

    save(event?) {
        // this.modalRef.destroy(this.selectedItems);
    }


    cancel(event?) {
        this.modalRef.destroy('onCancel');
    }

    filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
    }

    search(res: any) {
        console.log('nzSearchChange', res);
    }

    select(res: any) {
        console.log('nzSelectChange', res);
    }

    change(res: any) {
        console.log('nzChange', res);
    }


}
