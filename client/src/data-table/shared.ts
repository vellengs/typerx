import {
    NgModule, EventEmitter, Directive, ViewContainerRef, Input,
    Output, ContentChildren, ContentChild, TemplateRef, OnInit,
    OnChanges, OnDestroy, AfterContentInit, QueryList, SimpleChanges, EmbeddedViewRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-header',
    template: '<ng-content></ng-content>'
})
// tslint:disable-next-line:component-class-suffix
export class Header { }

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-footer',
    template: '<ng-content></ng-content>'
})
// tslint:disable-next-line:component-class-suffix
export class Footer { }

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[pTemplate]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
    }
})
// tslint:disable-next-line:directive-class-suffix
export class PrimeTemplate {

    @Input() type: string;

    // tslint:disable-next-line:no-input-rename
    @Input('pTemplate') name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[pTemplateWrapper]'
})
// tslint:disable-next-line:directive-class-suffix
export class TemplateWrapper implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    // tslint:disable-next-line:no-input-rename
    @Input('pTemplateWrapper') templateRef: TemplateRef<any>;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-column',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class Column implements AfterContentInit {
    @Input() field: string;
    @Input() colId: string;
    @Input() sortField: string;
    @Input() filterField: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() sortable: any;
    @Input() editable: boolean;
    @Input() filter: boolean;
    @Input() filterMatchMode: string;
    @Input() filterType = 'text';
    @Input() rowspan: number;
    @Input() colspan: number;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Input() selectionMode: string;
    @Input() filterPlaceholder: string;
    @Input() filterMaxlength: number;
    @Input() frozen: boolean;
    @Output() sortFunction: EventEmitter<any> = new EventEmitter();
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;
    public bodyTemplate: TemplateRef<any>;
    public footerTemplate: TemplateRef<any>;
    public filterTemplate: TemplateRef<any>;
    public editorTemplate: TemplateRef<any>;

    ngAfterContentInit(): void {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'editor':
                    this.editorTemplate = item.template;
                    break;

                default:
                    this.bodyTemplate = item.template;
                    break;
            }
        });
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-row',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class Row {

    @ContentChildren(Column) columns: QueryList<Column>;

}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-headerColumnGroup',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class HeaderColumnGroup {

    @Input() frozen: boolean;

    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-footerColumnGroup',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class FooterColumnGroup {

    @Input() frozen: boolean;

    @ContentChildren(Row) rows: QueryList<any>;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-columnBodyTemplateLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class ColumnBodyTemplateLoader implements OnInit, OnChanges, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: number;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.view) {
            return;
        }

        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-columnHeaderTemplateLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class ColumnHeaderTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-columnFooterTemplateLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class ColumnFooterTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-columnFilterTemplateLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class ColumnFilterTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-columnEditorTemplateLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class ColumnEditorTemplateLoader implements OnInit, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-templateLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class TemplateLoader implements OnInit, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() data: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }

    ngOnDestroy() {
        // tslint:disable-next-line:curly
        if (this.view) this.view.destroy();
    }
}

@NgModule({
    imports: [CommonModule],
    // tslint:disable-next-line:max-line-length
    exports: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader],
    declarations: [Header, Footer, Column, TemplateWrapper, ColumnHeaderTemplateLoader, ColumnBodyTemplateLoader, ColumnFooterTemplateLoader, ColumnFilterTemplateLoader, PrimeTemplate, TemplateLoader, Row, HeaderColumnGroup, FooterColumnGroup, ColumnEditorTemplateLoader]
})
export class SharedModule { }
