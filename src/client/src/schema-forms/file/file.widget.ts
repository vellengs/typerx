import { BaseWidget } from './../base.widget';
import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';


@Component({
    selector: 'app-file-widget',
    templateUrl: 'file.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class FileWidget extends BaseWidget implements AfterViewInit {

    protected reader = new FileReader();
    protected filedata: any = {};

    constructor() {
        super();
    }

    ngAfterViewInit() {
        // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
        // file inputs
        const control = this.control;
        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
        });

        this.reader.onloadend = () => {
            this.filedata.data = btoa(this.reader.result);
            this.formProperty.setValue(this.filedata, false);
        };
    }

    onFileChange($event) {
        const file = $event.target.files[0];
        this.filedata.filename = file.name;
        this.filedata.size = file.size;
        this.filedata['content-type'] = file.type;
        this.filedata.encoding = 'base64';
        this.reader.readAsBinaryString(file);
    }
}
