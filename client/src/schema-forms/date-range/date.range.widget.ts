import { Component, AfterViewInit } from '@angular/core';
import { ControlWidget } from 'angular2-schema-form';
import { LocalStorageService } from 'angular-web-storage';
import * as moment from 'moment';
import { BaseWidget } from './../base.widget';


@Component({
    selector: 'app-date-range-widget',
    templateUrl: 'date.range.widget.html'
})
// tslint:disable-next-line:component-class-suffix
export class DateRangeWidget extends BaseWidget implements AfterViewInit {

    _startDate = null;
    _endDate = null;
    newArray = (len) => {
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    }

    setControlValue() {
        let start, end = '';
        if (this._startDate) {
            start = moment(this._startDate).format('YYYY-MM-DD');
        }
        if (this._endDate) {
            end = moment(this._endDate).format('YYYY-MM-DD');
        }
        if (start || end) {
            start = start || '';
            end = end || '';
            this.control.setValue(start + '~' + end);
        } else {
            this.control.setValue(null);
        }
    }

    _startValueChange = () => {
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
        this.setControlValue();
    }

    _endValueChange = () => {
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
        this.setControlValue();
    }

    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    }

    _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    }

    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day');
    }

    get _endTime() {
        return {
            nzHideDisabledOptions: true,
            nzDisabledHours: () => {
                return this._isSameDay ? this.newArray(this._startDate.getHours()) : [];
            },
            nzDisabledMinutes: (h) => {
                if (this._isSameDay && h === this._startDate.getHours()) {
                    return this.newArray(this._startDate.getMinutes());
                }
                return [];
            },
            nzDisabledSeconds: (h, m) => {
                if (this._isSameDay && h === this._startDate.getHours() && m === this._startDate.getMinutes()) {
                    return this.newArray(this._startDate.getSeconds());
                }
                return [];
            }
        };
    }


    // TODO
    ngAfterViewInit() {
        const control = this.control;
        this.formProperty.valueChanges.subscribe((newValue) => {
            if (control.value !== newValue) {
                control.setValue(new Date(newValue), { emitEvent: false });
            }
        });

        this.formProperty.errorsChanges.subscribe((errors) => {
            control.setErrors(errors, { emitEvent: true });
            const messages = (errors || [])
                .filter(e => {
                    return e.path && e.path.slice(1) === this.formProperty.path;
                })
                .map(e => e.message);
            this.errorMessages = messages.filter((m, i) => messages.indexOf(m) === i);
        });
        control.valueChanges.subscribe((newValue) => {
            this.formProperty.setValue(newValue, false);
        });
    }
}
