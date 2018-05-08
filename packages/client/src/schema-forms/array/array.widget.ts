import { Component } from '@angular/core';
import { ArrayLayoutWidget } from 'angular2-schema-form';


@Component({
    selector: 'app-array-widget',
    templateUrl: 'array.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class ArrayWidget extends ArrayLayoutWidget {

    addItem() {
        this.formProperty.addItem();
    }

    removeItem(index: number) {
        this.formProperty.removeItem(index);
    }

    trackByIndex(index: number, item: any) {
        return index;
    }
}
