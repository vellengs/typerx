import { Component } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-select-search',
    templateUrl: 'select.search.html'
})
// tslint:disable-next-line:component-class-suffix
export class SelectSearch extends BaseWidget {
    searchChange(e) {
        alert('yes');
    }
}
