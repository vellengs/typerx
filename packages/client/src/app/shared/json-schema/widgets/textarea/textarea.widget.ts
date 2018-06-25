
import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';

@Component({
    selector: 'sf-textarea',
    template: `
  <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
    <textarea nz-input
      [attr.id]="id"
      [disabled]="disabled"
      [nzSize]="ui.size"
      [value]="value"
      (input)="setValue($event.target?.value)"
      [attr.maxLength]="schema.maxLength || null"
      [attr.placeholder]="ui.placeholder"
      [nzAutosize]="ui.autosize || true">
    </textarea>
  </sf-item-wrap>`,
    preserveWhitespaces: false,
})
export class TextareaWidgetComponent extends ControlWidget implements OnInit {

    static readonly KEY = 'textarea';

    ngOnInit(): void {
        this.ui.autosize = this.ui.autosize || { minRows: 3, maxRows: 6 };
    }

}
