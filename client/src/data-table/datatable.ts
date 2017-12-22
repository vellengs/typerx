import { NgZorroAntdModule } from 'ng-zorro-antd';
import {
    NgModule, Component, ElementRef, AfterContentInit, AfterViewInit, AfterViewChecked, OnInit, OnDestroy, Input,
    ViewContainerRef, ViewChild, IterableDiffers,
    Output, EventEmitter, ContentChild, ContentChildren, Renderer2, QueryList, TemplateRef,
    ChangeDetectorRef, Inject, forwardRef, EmbeddedViewRef, NgZone, ModuleWithProviders
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from './paginator';
import { SharedModule, Column, Header, Footer, HeaderColumnGroup, FooterColumnGroup, PrimeTemplate } from './shared';
import { DomHandler } from './domhandler';
import { ObjectUtils } from './objectutils';
import { Subscription } from 'rxjs/Subscription';


export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: { [s: string]: FilterMetadata; };
    globalFilter?: any;
}

export interface SortMeta {
    field: string;
    order: number;
}

export interface FilterMetadata {
    value?: any;
    matchMode?: string;
}

export interface BlockableUI {
    getBlockableElement(): HTMLElement;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-dtRadioButton',
    templateUrl: 'datatable.radio.button.html'
})
// tslint:disable-next-line:component-class-suffix
export class DTRadioButton {

    @Input() checked: boolean;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    public hover: boolean;

    handleClick(event) {
        this.onClick.emit(event);
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-dtCheckbox',
    templateUrl: 'datatable.checkbox.html'
})
// tslint:disable-next-line:component-class-suffix
export class DTCheckbox {

    @Input() checked: boolean;

    @Input() disabled: boolean;

    @Output() onChange: EventEmitter<any> = new EventEmitter();

    public hover: boolean;

    handleClick(event) {
        if (!this.disabled) {
            this.onChange.emit({ originalEvent: event, checked: !this.checked });
        }
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-rowExpansionLoader',
    template: ` `
})
// tslint:disable-next-line:component-class-suffix
export class RowExpansionLoader implements OnInit, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() rowData: any;

    @Input() rowIndex: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[pColumnHeaders]',
    templateUrl: 'column.headers.html'
})
// tslint:disable-next-line:component-class-suffix
export class ColumnHeaders {

    constructor( @Inject(forwardRef(() => DataTable)) public dt: DataTable) { }

    // tslint:disable-next-line:no-input-rename
    @Input('pColumnHeaders') columns: Column[];

    tabindex;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[pColumnFooters]',
    templateUrl: 'column.footers.html'
})
// tslint:disable-next-line:component-class-suffix
export class ColumnFooters {

    constructor( @Inject(forwardRef(() => DataTable)) public dt: DataTable) { }

    // tslint:disable-next-line:no-input-rename
    @Input('pColumnFooters') columns: Column[];
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[pTableBody]',
    templateUrl: 'table.body.html'
})
// tslint:disable-next-line:component-class-suffix
export class TableBody {

    constructor( @Inject(forwardRef(() => DataTable)) public dt: DataTable) { }

    // tslint:disable-next-line:no-input-rename
    @Input('pTableBody') columns: Column[];

    @Input() data: any[];

    visibleColumns() {
        return this.columns ? this.columns.filter(c => !c.hidden) : [];
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[pScrollableView]',
    templateUrl: 'scrollable.view.html',
})
// tslint:disable-next-line:component-class-suffix
export class ScrollableView implements AfterViewInit, AfterViewChecked, OnDestroy {

    constructor( @Inject(forwardRef(() => DataTable)) public dt: DataTable,
        public domHandler: DomHandler, public el: ElementRef, public renderer: Renderer2, public zone: NgZone) { }

    // tslint:disable-next-line:no-input-rename
    @Input('pScrollableView') columns: Column[];

    @Input() headerColumnGroup: HeaderColumnGroup;

    @Input() footerColumnGroup: HeaderColumnGroup;

    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;

    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;

    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;

    @ViewChild('scrollTable') scrollTableViewChild: ElementRef;

    @ViewChild('scrollTableWrapper') scrollTableWrapperViewChild: ElementRef;

    @ViewChild('scrollFooter') scrollFooterViewChild: ElementRef;

    @ViewChild('scrollFooterBox') scrollFooterBoxViewChild: ElementRef;

    @Input() frozen: boolean;

    @Input() width: string;

    @Input() virtualScroll: boolean;

    @Output() onVirtualScroll: EventEmitter<any> = new EventEmitter();

    public scrollBody: HTMLDivElement;

    public scrollHeader: HTMLDivElement;

    public scrollHeaderBox: HTMLDivElement;

    public scrollTable: HTMLDivElement;

    public scrollTableWrapper: HTMLDivElement;

    public scrollFooter: HTMLDivElement;

    public scrollFooterBox: HTMLDivElement;

    public bodyScrollListener: Function;

    public headerScrollListener: Function;

    public scrollBodyMouseWheelListener: Function;

    public scrollFunction: Function;

    public rowHeight: number;

    public scrollTimeout: any;

    ngAfterViewInit() {
        this.initScrolling();
    }

    ngAfterViewChecked() {
        if (this.virtualScroll && !this.rowHeight) {
            const row = this.domHandler.findSingle(this.scrollTable, 'tr.ui-widget-content:not(.ui-datatable-emptymessage-row)');
            if (row) {
                this.rowHeight = this.domHandler.getOuterHeight(row);
            }
        }

        if (!this.frozen) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignScrollBar();
                }, 1);
            });
        }
    }

    initScrolling() {
        this.scrollHeader = <HTMLDivElement>this.scrollHeaderViewChild.nativeElement;
        this.scrollHeaderBox = <HTMLDivElement>this.scrollHeaderBoxViewChild.nativeElement;
        this.scrollBody = <HTMLDivElement>this.scrollBodyViewChild.nativeElement;
        this.scrollTable = <HTMLDivElement>this.scrollTableViewChild.nativeElement;
        this.scrollTableWrapper = <HTMLDivElement>this.scrollTableWrapperViewChild.nativeElement;
        this.scrollFooter = this.scrollFooterViewChild ? <HTMLDivElement>this.scrollFooterViewChild.nativeElement : null;
        this.scrollFooterBox = this.scrollFooterBoxViewChild ? <HTMLDivElement>this.scrollFooterBoxViewChild.nativeElement : null;

        this.setScrollHeight();

        if (!this.frozen) {
            this.zone.runOutsideAngular(() => {
                this.scrollHeader.addEventListener('scroll', this.onHeaderScroll.bind(this));
                this.scrollBody.addEventListener('scroll', this.onBodyScroll.bind(this));
            });
        }

        if (!this.frozen) {
            this.alignScrollBar();
        } else {
            this.scrollBody.style.paddingBottom = this.domHandler.calculateScrollbarWidth() + 'px';
        }

    }

    onBodyScroll(event) {
        const frozenView = this.el.nativeElement.previousElementSibling;
        let frozenScrollBody;
        if (frozenView) {
            frozenScrollBody = this.domHandler.findSingle(frozenView, '.ui-datatable-scrollable-body');
        }

        this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        if (this.scrollFooterBox) {
            this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        }

        if (frozenScrollBody) {
            frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
        }

        if (this.virtualScroll) {
            const viewport = this.domHandler.getOuterHeight(this.scrollBody);
            const tableHeight = this.domHandler.getOuterHeight(this.scrollTable);
            const pageHeight = this.rowHeight * this.dt.rows;
            const virtualTableHeight = this.domHandler.getOuterHeight(this.scrollTableWrapper);
            const pageCount = (virtualTableHeight / pageHeight) || 1;

            if (this.scrollBody.scrollTop + viewport > parseFloat(this.scrollTable.style.top)
                + tableHeight || this.scrollBody.scrollTop < parseFloat(this.scrollTable.style.top)) {
                const page = Math.floor((this.scrollBody.scrollTop * pageCount) / (this.scrollBody.scrollHeight)) + 1;
                this.onVirtualScroll.emit({
                    page: page
                });
                this.scrollTable.style.top = ((page - 1) * pageHeight) + 'px';
            }
        }
    }

    setScrollHeight() {
        if (this.dt.scrollHeight) {
            if (this.dt.scrollHeight.indexOf('%') !== -1) {
                this.scrollBody.style.visibility = 'hidden';
                this.scrollBody.style.height = '100px';     // temporary height to calculate static height
                const containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                // tslint:disable-next-line:radix
                const relativeHeight = this.domHandler
                    // tslint:disable-next-line:radix
                    .getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.dt.scrollHeight) / 100;
                const staticHeight = containerHeight - 100;   // total height of headers, footers, paginators
                const scrollBodyHeight = (relativeHeight - staticHeight);

                this.scrollBody.style.height = 'auto';
                this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBody.style.visibility = 'visible';
            } else {
                this.scrollBody.style.maxHeight = this.dt.scrollHeight;
            }
        }
    }

    onHeaderScroll(event) {
        this.scrollHeader.scrollLeft = 0;
    }

    hasVerticalOverflow() {
        return this.domHandler.getOuterHeight(this.scrollTable) > this.domHandler.getOuterHeight(this.scrollBody);
    }

    alignScrollBar() {
        const scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
        this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';
        if (this.scrollFooterBox) {
            this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
        }
    }

    ngOnDestroy() {
        this.scrollHeader.removeEventListener('scroll', this.onHeaderScroll);
        this.scrollBody.removeEventListener('scroll', this.onBodyScroll);
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'p-dataTable',
    templateUrl: 'table.html',
    // styleUrls: ['./datatable.less'],
    providers: [DomHandler, ObjectUtils]
})
// tslint:disable-next-line:component-class-suffix
export class DataTable implements AfterViewChecked, AfterViewInit, AfterContentInit, OnInit, OnDestroy, BlockableUI {

    @Input() paginator: boolean;

    @Input() rows: number;

    @Input() total: number;

    @Input() pageLinks = 5;

    @Input() rowsPerPageOptions: number[];

    @Input() responsive: boolean;

    @Input() stacked: boolean;

    @Input() selectionMode: string;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() editable: boolean;

    @Output() onRowClick: EventEmitter<any> = new EventEmitter();

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onRowDblclick: EventEmitter<any> = new EventEmitter();

    @Output() onHeaderCheckboxToggle: EventEmitter<any> = new EventEmitter();

    @Input() headerCheckboxToggleAllPages: boolean;

    @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();

    @Input() filterDelay = 300;

    @Input() lazy: boolean;

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Input() resizableColumns: boolean;

    @Input() columnResizeMode = 'fit';

    @Output() onColResize: EventEmitter<any> = new EventEmitter();

    @Input() reorderableColumns: boolean;

    @Output() onColReorder: EventEmitter<any> = new EventEmitter();

    @Input() scrollable: boolean;

    @Input() virtualScroll: boolean;

    @Input() scrollHeight: any;

    @Input() scrollWidth: any;

    @Input() frozenWidth: any;

    @Input() unfrozenWidth: any;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() tableStyle: any;

    @Input() tableStyleClass: string;

    @Input() globalFilter: any;

    @Input() sortMode = 'single';

    @Input() defaultSortOrder = 1;

    @Input() groupField: string;

    @Input() contextMenu: any;

    @Input() csvSeparator = ',';

    @Input() exportFilename = 'download';

    @Input() emptyMessage = '没有数据';

    @Input() paginatorPosition = 'bottom';

    @Input() alwaysShowPaginator = true;

    @Input() metaKeySelection = true;


    // tslint:disable-next-line:no-inferrable-types
    @Input() immutable = true;

    @Input() frozenValue: any[];

    @Input() compareSelectionBy = 'deepEquals';

    @Output() onEditInit: EventEmitter<any> = new EventEmitter();

    @Output() onEditComplete: EventEmitter<any> = new EventEmitter();

    @Output() onEdit: EventEmitter<any> = new EventEmitter();

    @Output() onEditCancel: EventEmitter<any> = new EventEmitter();

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @ContentChild(Header) header;

    @ContentChild(Footer) footer;

    @Input() expandableRows: boolean;

    @Input() expandedRows: any[];

    @Input() expandableRowGroups: boolean;

    @Input() rowExpandMode = 'multiple';

    @Input() public expandedRowsGroups: any[];

    @Input() expandedIcon = 'fa-chevron-circle-down';

    @Input() collapsedIcon = 'fa-chevron-circle-right';

    @Input() tabindex = 1;

    // @Input() pageIndex = 1;

    private _pageIndex = 1;

    @Input()
    get pageIndex(): number {
        return this._pageIndex;
    }
    set pageIndex(value: number) {
        if (value === this._pageIndex && value < 0) {
            return;
        } else {
            this._pageIndex = value;
            this.onPageIndexChanged.emit(this._pageIndex);
        }
    }

    private _pageSize = 10;
    @Input()
    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(value: number) {
        if (value === this._pageSize && value < 0) {
            return;
        } else {
            this._pageSize = value;
            this.rows = value;
            this.onPageSizeChanged.emit(this._pageSize);
            // this.onPageChange();
        }
    }



    @Input() rowStyleClass: Function;

    @Input() rowStyleMap: Object;

    @Input() rowGroupMode: string;

    @Input() sortableRowGroup = true;

    @Input() sortFile: string;

    @Input() rowHover: boolean;

    @Input() public filters: { [s: string]: FilterMetadata; } = {};

    @Input() dataKey: string;

    @Input() loading: boolean;

    @Input() loadingIcon = 'fa-circle-o-notch';

    @Input() enableLoader = true;

    @Input() virtualScrollDelay = 500;

    @Input() rowGroupExpandMode = 'multiple';

    @Output() valueChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Output() firstChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() onRowExpand: EventEmitter<any> = new EventEmitter();

    @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onRowGroupExpand: EventEmitter<any> = new EventEmitter();

    @Output() onRowGroupCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onPageIndexChanged: EventEmitter<any> = new EventEmitter();

    @Output() onPageSizeChanged: EventEmitter<any> = new EventEmitter();


    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;

    @ContentChildren(Column) cols: QueryList<Column>;

    @ContentChildren(HeaderColumnGroup) headerColumnGroups: QueryList<HeaderColumnGroup>;

    @ContentChildren(FooterColumnGroup) footerColumnGroups: QueryList<FooterColumnGroup>;

    public _value: any[];

    public dataToRender: any[];

    public page = 0;

    public filterTimeout: any;

    public filteredValue: any[];

    public columns: Column[];

    public frozenColumns: Column[];

    public scrollableColumns: Column[];

    public frozenHeaderColumnGroup: HeaderColumnGroup;

    public scrollableHeaderColumnGroup: HeaderColumnGroup;

    public frozenFooterColumnGroup: HeaderColumnGroup;

    public scrollableFooterColumnGroup: HeaderColumnGroup;

    public columnsChanged = false;

    public sortColumn: Column;

    public columnResizing: boolean;

    public lastResizerHelperX: number;

    public documentEditListener: Function;

    public documentColumnResizeEndListener: Function;

    public resizerHelper: any;

    public resizeColumn: any;

    public reorderIndicatorUp: any;

    public reorderIndicatorDown: any;

    public iconWidth: number;

    public iconHeight: number;

    public draggedColumn: any;

    public dropPosition: number;

    public tbody: any;

    public rowTouched: boolean;

    public rowGroupToggleClick: boolean;

    public editingCell: any;

    public virtualTableHeight: number;

    public rowGroupMetadata: any;

    public rowGroupHeaderTemplate: TemplateRef<any>;

    public rowGroupFooterTemplate: TemplateRef<any>;

    public rowExpansionTemplate: TemplateRef<any>;

    public emptyMessageTemplate: TemplateRef<any>;

    public scrollBarWidth: number;

    public editorClick: boolean;

    public _first = 0;

    public selectionKeys: any;

    public preventSelectionKeysPropagation: boolean;

    public preventSortPropagation: boolean;

    public preventRowClickPropagation: boolean;

    _multiSortMeta: SortMeta[];

    _sortField: string;

    _sortOrder = 1;

    differ: any;

    _selection: any;

    _totalRecords: number;


    globalFilterFunction: any;

    columnsSubscription: Subscription;

    totalRecordsChanged: boolean;

    anchorRowIndex: number;

    rangeRowIndex: number;

    initialized: boolean;

    virtualScrollTimer: any;

    virtualScrollableTableWrapper: HTMLDivElement;

    editChanged: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public differs: IterableDiffers,
        public renderer: Renderer2, public changeDetector: ChangeDetectorRef, public objectUtils: ObjectUtils,
        public zone: NgZone) {
        this.differ = differs.find([]).create(null);
    }

    @Input() rowTrackBy: Function = (index: number, item: any) => item;

    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    }

    ngAfterContentInit() {
        this.initColumns();
        this.initColumnGroups();

        this.columnsSubscription = this.cols.changes.subscribe(_ => {
            this.initColumns();
            this.changeDetector.markForCheck();
        });

        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'rowexpansion':
                    this.rowExpansionTemplate = item.template;
                    break;

                case 'rowgroupheader':
                    this.rowGroupHeaderTemplate = item.template;
                    break;

                case 'rowgroupfooter':
                    this.rowGroupFooterTemplate = item.template;
                    break;

                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                    break;
            }
        });
    }

    ngAfterViewChecked() {
        if (this.columnsChanged && this.el.nativeElement.offsetParent) {
            if (this.resizableColumns) {
                this.initResizableColumns();
            }

            if (this.reorderableColumns) {
                this.initColumnReordering();
            }

            this.columnsChanged = false;
        }

        if (this.totalRecordsChanged && this.virtualScroll &&
            this.virtualScrollableTableWrapper && this.virtualScrollableTableWrapper.offsetParent) {
            const row = this.domHandler.findSingle(this.virtualScrollableTableWrapper, 'tr.ui-widget-content');
            const rowHeight = this.domHandler.getOuterHeight(row);
            this.virtualTableHeight = this._totalRecords * rowHeight;
            this.virtualScrollableTableWrapper.style.height = this.virtualTableHeight + 'px';
            this.totalRecordsChanged = false;
        }
    }

    ngAfterViewInit() {
        if (this.globalFilter) {
            this.globalFilterFunction = this.renderer.listen(this.globalFilter, 'keyup', () => {
                if (this.filterTimeout) {
                    clearTimeout(this.filterTimeout);
                }
                this.filterTimeout = setTimeout(() => {
                    this._filter();
                    this.filterTimeout = null;
                }, this.filterDelay);
            });
        }

        this.virtualScrollableTableWrapper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-datatable-scrollable-table-wrapper');

        this.initialized = true;
    }



    @Input() get multiSortMeta(): SortMeta[] {
        return this._multiSortMeta;
    }

    set multiSortMeta(val: SortMeta[]) {
        this._multiSortMeta = val;
        if (this.sortMode === 'multiple') {
            this.sortMultiple();
        }
    }

    @Input() get sortField(): string {
        return this._sortField;
    }

    set sortField(val: string) {
        this._sortField = val;

        if (this.sortMode === 'single') {
            this.sortSingle();
        }
    }

    @Input() get sortOrder(): number {
        return this._sortOrder;
    }
    set sortOrder(val: number) {
        this._sortOrder = val;
        if (this.sortMode === 'single') {
            this.sortSingle();
        }
    }
    @Input() get value(): any[] {
        return this._value;
    }

    set value(val: any[]) {
        if (this.immutable) {
            this._value = val ? [...val] : null;
            this.handleDataChange();
        } else {
            this._value = val;
        }

        this.valueChange.emit(this.value);
    }

    @Input() get first(): number {
        return this._first;
    }

    set first(val: number) {
        const shouldPaginate = this.initialized && this._first !== val;

        this._first = val;

        if (shouldPaginate) {
            this.paginate();
        }
    }

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val: number) {
        this._totalRecords = val;
        this.totalRecordsChanged = true;
    }


    @Input() get selection(): any {
        return this._selection;
    }

    set selection(val: any) {
        this._selection = val;

        if (this.dataKey && !this.preventSelectionKeysPropagation) {
            this.selectionKeys = {};
            if (this._selection) {
                for (const data of this._selection) {
                    this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
        }
        this.preventSelectionKeysPropagation = false;
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngDoCheck() {
        if (!this.immutable) {
            const changes = this.differ.diff(this.value);
            if (changes) {
                this.handleDataChange();
            }
        }
    }

    handleDataChange() {
        if (this.lazy && this.enableLoader) {
            this.loading = false;
        }

        if (this.paginator) {
            this.updatePaginator();
        }

        if (!this.lazy) {
            if (this.hasFilter()) {
                this._filter();
            }

            if (this.preventSortPropagation) {
                this.preventSortPropagation = false;
            } else if (this.sortField || this.multiSortMeta) {
                if (!this.sortColumn && this.columns) {
                    this.sortColumn = this.columns.find(col => col.field === this.sortField && col.sortable === 'custom');
                }

                if (this.sortMode === 'single') {

                    this.sortSingle();
                } else if (this.sortMode === 'multiple') {
                    this.sortMultiple();
                }
            }
        }

        this.updateDataToRender(this.filteredValue || this.value);
    }

    initColumns(): void {
        this.columns = this.cols.toArray();
        this.initScrollableColumns();

        this.columnsChanged = true;
    }

    initScrollableColumns() {
        this.scrollableColumns = [];
        this.frozenColumns = [];

        for (const col of this.columns) {
            if (col.frozen) {
                this.frozenColumns.push(col);

            } else {
                this.scrollableColumns.push(col);
            }
        }
    }

    initColumnGroups(): void {
        const headerColumnsGroups = this.headerColumnGroups.toArray();
        const footerColumnsGroups = this.footerColumnGroups.toArray();

        for (const columnGroup of headerColumnsGroups) {
            if (columnGroup.frozen) {
                this.frozenHeaderColumnGroup = columnGroup;

            } else {
                this.scrollableHeaderColumnGroup = columnGroup;
            }
        }

        for (const columnGroup of footerColumnsGroups) {
            if (columnGroup.frozen) {
                this.frozenFooterColumnGroup = columnGroup;
            } else {
                this.scrollableFooterColumnGroup = columnGroup;
            }
        }
    }

    resolveFieldData(data: any, field: string): any {
        if (data && field) {
            if (field.indexOf('.') === -1) {
                return data[field];
            } else {
                const fields: string[] = field.split('.');
                let value = data;
                for (let i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }
                    value = value[fields[i]];
                }
                return value;
            }
        } else {
            return null;
        }
    }

    updateRowGroupMetadata() {
        this.rowGroupMetadata = {};
        if (this.dataToRender) {
            for (let i = 0; i < this.dataToRender.length; i++) {
                const rowData = this.dataToRender[i];
                const group = this.resolveFieldData(rowData, this.sortField);
                if (i === 0) {
                    this.rowGroupMetadata[group] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.dataToRender[i - 1];
                    const previousRowGroup = this.resolveFieldData(previousRowData, this.sortField);
                    if (group === previousRowGroup) {
                        this.rowGroupMetadata[group].size++;
                    } else {
                        this.rowGroupMetadata[group] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    updatePaginator() {
        // total records
        this.updateTotalRecords();

        // first
        if (this.totalRecords && this.first >= this.totalRecords) {
            const numberOfPages = Math.ceil(this.totalRecords / this.rows);
            this._first = Math.max((numberOfPages - 1) * this.rows, 0);
        }
    }

    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
    }

    onPageChange(event) {
        this._first = event.first;
        this.firstChange.emit(this.first);
        this.rows = event.rows;
        this.paginate();
    }


    paginate() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());

        } else {
            this.updateDataToRender(this.filteredValue || this.value);
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }

    updateDataToRender(datasource) {
        if ((this.paginator || this.virtualScroll) && datasource) {
            this.dataToRender = [];
            const startIndex: number = this.lazy ? 0 : this.first;
            const endIndex: number = this.virtualScroll ? this.first + this.rows * 2 : startIndex + this.rows;

            for (let i = startIndex; i < endIndex; i++) {
                if (i >= datasource.length) {
                    break;
                }

                this.dataToRender.push(datasource[i]);
            }
        } else {
            this.dataToRender = datasource;
        }

        if (this.rowGroupMode) {
            this.updateRowGroupMetadata();
        }
    }

    onVirtualScroll(event) {
        this._first = (event.page - 1) * this.rows;
        this.zone.run(() => {
            if (this.virtualScrollTimer) {
                clearTimeout(this.virtualScrollTimer);
            }

            this.virtualScrollTimer = setTimeout(() => {
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());

                } else {
                    this.updateDataToRender(this.filteredValue || this.value);
                }
            }, this.virtualScrollDelay);
        });
    }

    onHeaderKeydown(event, column: Column) {
        if (event.keyCode === 13) {
            this.sort(event, column);
            event.preventDefault();
        }
    }

    onHeaderMousedown(event, header: any) {
        if (this.reorderableColumns) {
            if (event.target.nodeName !== 'INPUT') {
                header.draggable = true;
            } else if (event.target.nodeName === 'INPUT') {
                header.draggable = false;
            }
        }
    }

    sort(event, column: Column) {
        if (!column.sortable) {
            return;
        }
        const targetNode = event.target.nodeName;
        if ((targetNode === 'TH' &&
            this.domHandler.hasClass(event.target, 'ui-sortable-column')) ||
            ((targetNode === 'SPAN' || targetNode === 'DIV') && !this.domHandler.hasClass(event.target, 'ui-clickable'))) {
            if (!this.immutable) {
                this.preventSortPropagation = true;
            }

            const columnSortField = column.sortField || column.field;
            this._sortOrder = (this.sortField === columnSortField) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = columnSortField;
            this.sortColumn = column;
            const metaKey = event.metaKey || event.ctrlKey;

            if (this.sortMode === 'multiple') {
                if (!this.multiSortMeta || !metaKey) {
                    this._multiSortMeta = [];
                }

                this.addSortMeta({ field: this.sortField, order: this.sortOrder });
            }

            if (this.lazy) {
                this._first = 0;
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else {
                if (this.sortMode === 'multiple') {
                    this.sortMultiple();
                } else {
                    this.sortSingle();
                }

            }

            this.onSort.emit({
                field: this.sortField,
                order: this.sortOrder,
                multisortmeta: this.multiSortMeta
            });
        }

        this.updateDataToRender(this.filteredValue || this.value);
    }

    sortSingle() {
        if (this.value) {
            if (this.sortColumn && this.sortColumn.sortable === 'custom') {
                this.preventSortPropagation = true;
                this.sortColumn.sortFunction.emit({
                    field: this.sortField,
                    order: this.sortOrder
                });
            } else {
                this.value.sort((data1, data2) => {
                    const value1 = this.resolveFieldData(data1, this.sortField);
                    const value2 = this.resolveFieldData(data2, this.sortField);
                    let result = null;

                    if (value1 == null && value2 != null) {
                        result = -1;
                    } else if (value1 != null && value2 == null) {
                        result = 1;
                    } else if (value1 == null && value2 == null) {
                        result = 0;
                    } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                        result = value1.localeCompare(value2);
                    } else {
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    }
                    return (this.sortOrder * result);
                });
            }

            this._first = 0;

            if (this.hasFilter()) {
                this._filter();
            }
        }
    }

    sortMultiple() {
        if (this.value) {
            this.value.sort((data1, data2) => {
                return this.multisortField(data1, data2, this.multiSortMeta, 0);
            });

            if (this.hasFilter()) {
                this._filter();
            }
        }
    }

    multisortField(data1, data2, multiSortMeta, index) {
        const value1 = this.resolveFieldData(data1, multiSortMeta[index].field);
        const value2 = this.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;

        if (typeof value1 === 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 !== value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        } else {
            result = (value1 < value2) ? -1 : 1;
        }

        if (value1 === value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }

        return (multiSortMeta[index].order * result);
    }

    addSortMeta(meta) {
        let index = -1;
        for (let i = 0; i < this.multiSortMeta.length; i++) {
            if (this.multiSortMeta[i].field === meta.field) {
                index = i;
                break;
            }
        }

        if (index >= 0) {
            this.multiSortMeta[index] = meta;
        } else {
            this.multiSortMeta.push(meta);
        }

    }

    isSorted(column: Column) {
        if (!column.sortable) {
            return false;
        }

        const columnSortField = column.sortField || column.field;

        if (this.sortMode === 'single') {
            return (this.sortField && columnSortField === this.sortField);
        } else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field === columnSortField) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    getSortOrder(column: Column) {
        let order = 0;
        const columnSortField = column.sortField || column.field;

        if (this.sortMode === 'single') {
            if (this.sortField && columnSortField === this.sortField) {
                order = this.sortOrder;
            }
        } else if (this.sortMode === 'multiple') {
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field === columnSortField) {
                        order = this.multiSortMeta[i].order;
                        break;
                    }
                }
            }
        }
        return order;
    }

    onRowGroupClick(event) {
        if (this.rowGroupToggleClick) {
            this.rowGroupToggleClick = false;
            return;
        }

        if (this.sortableRowGroup) {
            const targetNode = event.target.nodeName;
            if ((targetNode === 'TD' || (targetNode === 'SPAN' && !this.domHandler.hasClass(event.target, 'ui-clickable')))) {
                if (this.sortField !== this.groupField) {
                    this._sortField = this.groupField;
                    this.sortSingle();
                } else {
                    this._sortOrder = -1 * this.sortOrder;
                    this.sortSingle();
                }
            }
        }
    }

    clearSelectionRange() {
        let rangeStart, rangeEnd;

        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        } else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        } else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            const rangeRowData = this.dataToRender[i];
            const selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val, k) => k !== selectionIndex);
            const dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    }

    selectRange(rowIndex: number) {
        let rangeStart, rangeEnd;

        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        } else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        } else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            const rangeRowData = this.dataToRender[i];
            this._selection = [...this.selection, rangeRowData];
            this.selectionChange.emit(this.selection);
            const dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
            this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    }

    handleRowClick(event: MouseEvent, rowData: any, index: number) {
        if (this.preventRowClickPropagation) {
            this.preventRowClickPropagation = false;
            return;
        }

        const targetNode = (<HTMLElement>event.target).nodeName;

        if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' ||
            (this.domHandler.hasClass(event.target, 'ui-clickable'))) {
            return;
        }

        this.onRowClick.next({ originalEvent: event, data: rowData });

        if (this.selectionMode) {
            if (this.isMultipleSelectionMode() && event.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange();
                }

                this.rangeRowIndex = index;
                this.selectRange(index);
            } else {
                const selected = this.isSelected(rowData);
                const metaSelection = this.rowTouched ? false : this.metaKeySelection;
                const dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = index;
                this.rangeRowIndex = index;

                if (metaSelection) {
                    const metaKey = event.metaKey || event.ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        } else {
                            const selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }

                        this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        } else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            } else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }

                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }

                        this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
                    }
                } else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
                        } else {
                            this._selection = rowData;
                            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    } else {
                        if (selected) {
                            const selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
                            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        } else {
                            this._selection = [...this.selection || [], rowData];
                            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }

                    this.selectionChange.emit(this.selection);
                }
            }

            this.preventSelectionKeysPropagation = true;
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event: Event) {
        this.rowTouched = true;
    }

    selectRowWithRadio(event: Event, rowData: any) {
        if (this.selection !== rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });

            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        } else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });
        }

        this.preventSelectionKeysPropagation = true;
        this.preventRowClickPropagation = true;
    }

    toggleRowWithCheckbox(event, rowData: any) {
        const selectionIndex = this.findIndexInSelection(rowData);
        this.selection = this.selection || [];
        const dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;

        if (selectionIndex !== -1) {
            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        } else {
            this._selection = [...this.selection, rowData];
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }

        this.selectionChange.emit(this.selection);
        this.preventSelectionKeysPropagation = true;
        this.preventRowClickPropagation = true;
    }

    toggleRowsWithCheckbox(event) {
        if (event.checked) {
            this.selection = this.headerCheckboxToggleAllPages ? this.value.slice() : this.dataToRender.slice();
        } else {
            this.selection = [];
        }

        this.selectionChange.emit(this.selection);
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: event.checked });
    }

    onRowRightClick(event, rowData) {
        if (this.contextMenu) {
            const selectionIndex = this.findIndexInSelection(rowData);
            const selected = selectionIndex !== -1;
            const dataKeyValue: string = this.dataKey ? String(this.resolveFieldData(rowData, this.dataKey)) : null;

            if (!selected) {
                if (this.isSingleSelectionMode()) {
                    this.selection = rowData;
                    this.selectionChange.emit(rowData);
                } else if (this.isMultipleSelectionMode()) {
                    this.selection = [rowData];
                    this.selectionChange.emit(this.selection);
                }

                if (this.dataKey) {
                    this.selectionKeys[String(this.resolveFieldData(rowData, this.dataKey))] = 1;
                }
            }

            this.contextMenu.show(event);
            this.onContextMenuSelect.emit({ originalEvent: event, data: rowData });
        }

        this.preventSelectionKeysPropagation = true;
    }

    rowDblclick(event, rowData) {
        this.onRowDblclick.emit({ originalEvent: event, data: rowData });
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    findIndexInSelection(rowData: any) {
        let index = -1;
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            } else {
                if (this.selection instanceof Array) {
                    return this.findIndexInSelection(rowData) > -1;
                } else {
                    return this.equals(rowData, this.selection);
                }
            }
        }

        return false;
    }

    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    }

    get allSelected() {
        if (this.headerCheckboxToggleAllPages && this.value && this.value.length) {
            return this.selection && this.value && this.selection.length === this.value.length;
        } else if (this.value.length) {
            let val = true;
            if (this.dataToRender && this.selection && (this.dataToRender.length <= this.selection.length)) {
                for (const data of this.dataToRender) {
                    if (!this.isSelected(data)) {
                        val = false;
                        break;
                    }
                }
            } else {
                val = false;
            }

            return val;
        } else {
            return false;
        }
    }

    onFilterKeyup(value, field, matchMode) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            this.filter(value, field, matchMode);
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    filter(value, field, matchMode) {
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        } else if (this.filters[field]) {
            delete this.filters[field];
        }

        this._filter();
    }

    isFilterBlank(filter: any): boolean {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length === 0)
                || (filter instanceof Array && filter.length === 0)) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    _filter() {
        this._first = 0;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            if (!this.value || !this.columns) {
                return;
            }

            this.filteredValue = [];

            for (let i = 0; i < this.value.length; i++) {
                let localMatch = true;
                let globalMatch = false;

                for (let j = 0; j < this.columns.length; j++) {
                    const col = this.columns[j],
                        filterMeta = this.filters[col.filterField || col.field];

                    // local
                    if (filterMeta) {
                        const filterValue = filterMeta.value,
                            filterField = col.filterField || col.field,
                            filterMatchMode = filterMeta.matchMode || 'startsWith',
                            dataFieldValue = this.resolveFieldData(this.value[i], filterField);
                        const filterConstraint = this.filterConstraints[filterMatchMode];

                        if (!filterConstraint(dataFieldValue, filterValue)) {
                            localMatch = false;
                        }

                        if (!localMatch) {
                            break;
                        }
                    }

                    // global
                    if (this.globalFilter && !globalMatch) {
                        globalMatch = this.filterConstraints['contains'](
                            this.resolveFieldData(this.value[i], col.filterField || col.field), this.globalFilter.value);
                    }
                }

                let matches = localMatch;
                if (this.globalFilter) {
                    matches = localMatch && globalMatch;
                }

                if (matches) {
                    this.filteredValue.push(this.value[i]);
                }
            }

            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }

            if (this.paginator) {
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }

            this.updateDataToRender(this.filteredValue || this.value);
        }

        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
    }

    hasFilter() {
        let empty = true;
        for (const prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }

        return !empty || (this.globalFilter && this.globalFilter.value && this.globalFilter.value.trim().length);
    }

    onFilterInputClick(event) {
        event.stopPropagation();
    }

    // tslint:disable-next-line:member-ordering
    filterConstraints = {

        startsWith(value, filter): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            const filterValue = filter.toLowerCase();
            return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
        },

        contains(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        },

        endsWith(value, filter): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            const filterValue = filter.toString().toLowerCase();
            return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
        },

        equals(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase() === filter.toString().toLowerCase();
        },

        notEquals(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }

            if (value === undefined || value === null) {
                return true;
            }

            return value.toString().toLowerCase() !== filter.toString().toLowerCase();
        },

        in(value, filter: any[]): boolean {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            for (let i = 0; i < filter.length; i++) {
                if (filter[i] === value) {
                    return true;
                }
            }

            return false;
        }
    };

    switchCellToEditMode(cell: any, column: Column, rowData: any) {
        if (!this.selectionMode && this.editable && column.editable) {
            this.editorClick = true;
            this.bindDocumentEditListener();

            if (cell !== this.editingCell) {
                if (this.editingCell && this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0) {
                    this.domHandler.removeClass(this.editingCell, 'ui-cell-editing');
                }

                this.editingCell = cell;
                this.onEditInit.emit({ column: column, data: rowData });
                this.domHandler.addClass(cell, 'ui-cell-editing');
                const focusable = this.domHandler.findSingle(cell, '.ui-cell-editor input');
                if (focusable) {
                    setTimeout(() => this.domHandler.invokeElementMethod(focusable, 'focus'), 50);
                }
            }
        }
    }

    switchCellToViewMode(element: any) {
        this.editingCell = null;
        const cell = this.findCell(element);
        this.domHandler.removeClass(cell, 'ui-cell-editing');
        this.unbindDocumentEditListener();
    }

    closeCell() {
        if (this.editingCell) {
            this.domHandler.removeClass(this.editingCell, 'ui-cell-editing');
            this.editingCell = null;
            this.unbindDocumentEditListener();
        }
    }

    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen('document', 'click', (event) => {
                if (!this.editorClick) {
                    this.closeCell();
                }
                this.editorClick = false;
            });
        }
    }

    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    }

    onCellEditorKeydown(event, column: Column, rowData: any, rowIndex: number) {
        if (this.editable) {
            // enter
            if (event.keyCode === 13) {
                if (this.domHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0) {
                    this.switchCellToViewMode(event.target);
                    event.preventDefault();
                }
            } else if (event.keyCode === 27) {
                this.switchCellToViewMode(event.target);
                event.preventDefault();
            } else if (event.keyCode === 9) {
                if (event.shiftKey) {
                    this.moveToPreviousCell(event);
                } else {
                    this.moveToNextCell(event);
                }
            }
        }
    }

    onCellEditorInput(event, column: Column, rowData: any, rowIndex: number) {
        if (this.editable) {
            this.onEdit.emit({ originalEvent: event, column: column, data: rowData, index: rowIndex });
        }
    }

    onCellEditorChange(event, column: Column, rowData: any, rowIndex: number) {
        if (this.editable) {
            this.editChanged = true;

            this.onEditComplete.emit({ column: column, data: rowData, index: rowIndex });
        }
    }

    onCellEditorBlur(event, column: Column, rowData: any, rowIndex: number) {
        if (this.editable) {
            if (this.editChanged) {
                this.editChanged = false;
            } else {
                this.onEditCancel.emit({ column: column, data: rowData, index: rowIndex });
            }
        }
    }

    moveToPreviousCell(event: KeyboardEvent) {
        const currentCell = this.findCell(event.target);
        const row = currentCell.parentElement;
        const targetCell = this.findPreviousEditableColumn(currentCell);

        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        const currentCell = this.findCell(event.target);
        const row = currentCell.parentElement;
        const targetCell = this.findNextEditableColumn(currentCell);

        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    findPreviousEditableColumn(cell: Element) {
        let prevCell = cell.previousElementSibling;

        if (!prevCell) {
            const previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }

        if (prevCell) {
            if (this.domHandler.hasClass(prevCell, 'ui-editable-column')) {
                return prevCell;
            } else {
                return this.findPreviousEditableColumn(prevCell);
            }
        } else {
            return null;
        }
    }

    findNextEditableColumn(cell: Element) {
        let nextCell = cell.nextElementSibling;

        if (!nextCell) {
            const nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }

        if (nextCell) {
            if (this.domHandler.hasClass(nextCell, 'ui-editable-column')) {
                return nextCell;
            } else {
                return this.findNextEditableColumn(nextCell);
            }

        } else {
            return null;
        }
    }

    onCustomEditorFocusPrev(event: KeyboardEvent) {
        this.moveToPreviousCell(event);
    }

    onCustomEditorFocusNext(event: KeyboardEvent) {
        this.moveToNextCell(event);
    }

    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && cell.tagName !== 'TD') {
                cell = cell.parentElement;
            }

            return cell;
        } else {
            return null;
        }
    }

    initResizableColumns() {
        this.tbody = this.domHandler.findSingle(this.el.nativeElement, 'tbody.ui-datatable-data');
        this.resizerHelper = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-column-resizer-helper');
        this.fixColumnWidths();
    }

    onDocumentMouseMove(event) {
        if (this.columnResizing) {
            this.onColumnResize(event);
        }
    }

    onDocumentMouseUp(event) {
        if (this.columnResizing) {
            this.columnResizing = false;
            this.onColumnResizeEnd(event);
        }
    }

    bindColumnResizeEvents() {
        this.zone.runOutsideAngular(() => {
            window.document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
        });

        this.documentColumnResizeEndListener = this.renderer.listen('document', 'mouseup', (event) => {
            if (this.columnResizing) {
                this.columnResizing = false;
                this.onColumnResizeEnd(event);
            }
        });
    }

    unbindColumnResizeEvents() {
        window.document.removeEventListener('mousemove', this.onDocumentMouseMove);

        if (this.documentColumnResizeEndListener) {
            this.documentColumnResizeEndListener();
            this.documentColumnResizeEndListener = null;
        }
    }

    initColumnResize(event) {
        this.bindColumnResizeEvents();

        const container = this.el.nativeElement.children[0];
        const containerLeft = this.domHandler.getOffset(container).left;
        this.resizeColumn = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = (event.pageX - containerLeft + container.scrollLeft);
    }

    onColumnResize(event) {
        const container = this.el.nativeElement.children[0];
        const containerLeft = this.domHandler.getOffset(container).left;

        console.log('start add unseletable css');

        this.domHandler.addClass(container, 'ui-unselectable-text');
        this.resizerHelper.style.height = container.offsetHeight + 'px';
        this.resizerHelper.style.top = 0 + 'px';
        this.resizerHelper.style.left = (event.pageX - containerLeft + container.scrollLeft) + 'px';

        this.resizerHelper.style.display = 'block';
    }

    onColumnResizeEnd(event) {
        const delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
        const columnWidth = this.resizeColumn.offsetWidth;
        const newColumnWidth = columnWidth + delta;
        const minWidth = this.resizeColumn.style.minWidth || 15;

        // tslint:disable-next-line:radix
        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                const nextColumn = this.resizeColumn.nextElementSibling;
                const nextColumnWidth = nextColumn.offsetWidth - delta;

                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeColumn.style.width = newColumnWidth + 'px';
                    if (nextColumn) {
                        nextColumn.style.width = nextColumnWidth + 'px';
                    }

                    if (this.scrollable) {
                        const colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
                        const resizeColumnIndex = this.domHandler.index(this.resizeColumn);
                        colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';

                        if (nextColumn) {
                            colGroup.children[resizeColumnIndex + 1].style.width = nextColumnWidth + 'px';
                        }
                    }
                }
            } else if (this.columnResizeMode === 'expand') {
                this.tbody.parentElement.style.width = this.tbody.parentElement.offsetWidth + delta + 'px';
                this.resizeColumn.style.width = newColumnWidth + 'px';
                const containerWidth = this.tbody.parentElement.style.width;

                if (this.scrollable) {
                    this.domHandler.findSingle(this.el.nativeElement,
                        '.ui-datatable-scrollable-header-box').children[0].style.width = containerWidth;
                    const colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
                    const resizeColumnIndex = this.domHandler.index(this.resizeColumn);
                    colGroup.children[resizeColumnIndex].style.width = newColumnWidth + 'px';
                } else {
                    this.el.nativeElement.children[0].style.width = containerWidth;
                }
            }

            this.onColResize.emit({
                element: this.resizeColumn,
                delta: delta
            });
        }

        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        // this.domHandler.removeClass(this.el.nativeElement.children[0], 'ui-unselectable-text');
        this.unbindColumnResizeEvents();
    }

    fixColumnWidths() {
        const columns = this.domHandler.find(this.el.nativeElement, 'th.ui-resizable-column');
        let bodyCols;

        for (let i = 0; i < columns.length; i++) {
            columns[i].style.width = columns[i].offsetWidth + 'px';
        }

        if (this.scrollable) {
            const colGroup = this.domHandler.findSingle(this.el.nativeElement, 'colgroup.ui-datatable-scrollable-colgroup');
            bodyCols = colGroup.children;

            if (bodyCols) {
                for (let i = 0; i < columns.length; i++) {
                    bodyCols[i].style.width = columns[i].offsetWidth + 'px';
                }
            }
        }
    }

    onColumnDragStart(event) {
        if (this.columnResizing) {
            event.preventDefault();
            return;
        }

        this.draggedColumn = this.findParentHeader(event.target);
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
        this.zone.runOutsideAngular(() => {
            window.document.addEventListener('dragover', this.onColumnDragover.bind(this));
        });
    }

    onColumnDragover(event) {
        const dropHeader = this.findParentHeader(event.target);
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            const container = this.el.nativeElement.children[0];
            const containerOffset = this.domHandler.getOffset(container);
            const dropHeaderOffset = this.domHandler.getOffset(dropHeader);

            if (this.draggedColumn !== dropHeader) {
                const targetLeft = dropHeaderOffset.left - containerOffset.left;
                const targetTop = containerOffset.top - dropHeaderOffset.top;
                const columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
                this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUp.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                } else {
                    this.reorderIndicatorUp.style.left = (targetLeft - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.reorderIndicatorDown.style.left = (targetLeft - Math.ceil(this.iconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }

                this.reorderIndicatorUp.style.display = 'block';
                this.reorderIndicatorDown.style.display = 'block';
            } else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragleave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
            window.document.removeEventListener('dragover', this.onColumnDragover);
        }
    }

    onColumnDrop(event) {
        event.preventDefault();
        if (this.draggedColumn) {
            const dragIndex = this.domHandler.index(this.draggedColumn);
            const dropIndex = this.domHandler.index(this.findParentHeader(event.target));
            let allowDrop = (dragIndex !== dropIndex);
            if (allowDrop && ((dropIndex - dragIndex === 1 && this.dropPosition === -1)
                || (dragIndex - dropIndex === 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }

            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                if (this.scrollable) {
                    this.initScrollableColumns();
                }

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }

            this.reorderIndicatorUp.style.display = 'none';
            this.reorderIndicatorDown.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    initColumnReordering() {
        this.reorderIndicatorUp = this.domHandler.findSingle(this.el.nativeElement.children[0], 'span.ui-datatable-reorder-indicator-up');
        this.reorderIndicatorDown = this.domHandler.findSingle(this.el.nativeElement.children[0],
            'span.ui-datatable-reorder-indicator-down');
        this.iconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
        this.iconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
    }

    findParentHeader(element) {
        if (element.nodeName === 'TH') {
            return element;
        } else {
            let parent = element.parentElement;
            while (parent.nodeName !== 'TH') {
                parent = parent.parentElement;
                if (!parent) {
                    break;
                }
            }
            return parent;
        }
    }

    hasFooter() {
        if (this.footerColumnGroups.first) {
            return true;
        } else {
            if (this.columns) {
                for (let i = 0; i < this.columns.length; i++) {
                    if (this.columns[i].footer || this.columns[i].footerTemplate) {
                        return true;
                    }
                }
            }

        }
        return false;
    }

    isEmpty() {
        return !this.dataToRender || (this.dataToRender.length === 0);
    }

    createLazyLoadMetadata(): LazyLoadEvent {
        if (this.enableLoader) {
            this.loading = true;
        }

        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.globalFilter ? this.globalFilter.value : null,
            multiSortMeta: this.multiSortMeta
        };
    }

    toggleRow(row: any, event?: Event) {
        if (!this.expandedRows) {
            this.expandedRows = [];
        }

        const expandedRowIndex = this.findExpandedRowIndex(row);

        if (expandedRowIndex !== -1) {
            this.expandedRows.splice(expandedRowIndex, 1);
            this.onRowCollapse.emit({
                originalEvent: event,
                data: row
            });
        } else {
            if (this.rowExpandMode === 'single') {
                this.expandedRows = [];
            }

            this.expandedRows.push(row);
            this.onRowExpand.emit({
                originalEvent: event,
                data: row
            });
        }

        if (event) {
            event.preventDefault();
        }
    }

    findExpandedRowIndex(row: any): number {
        let index = -1;
        if (this.expandedRows) {
            for (let i = 0; i < this.expandedRows.length; i++) {
                if (this.expandedRows[i] === row) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    isRowExpanded(row: any): boolean {
        return this.findExpandedRowIndex(row) !== -1;
    }

    findExpandedRowGroupIndex(row: any): number {
        let index = -1;
        if (this.expandedRowsGroups && this.expandedRowsGroups.length) {
            for (let i = 0; i < this.expandedRowsGroups.length; i++) {
                const group = this.expandedRowsGroups[i];
                const rowGroupField = this.resolveFieldData(row, this.groupField);
                if (rowGroupField === group) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }

    isRowGroupExpanded(row: any): boolean {
        return this.findExpandedRowGroupIndex(row) !== -1;
    }

    toggleRowGroup(event: Event, row: any): void {

        if (!this.expandedRowsGroups) {
            this.expandedRowsGroups = [];
        }

        this.rowGroupToggleClick = true;
        const index = this.findExpandedRowGroupIndex(row);
        const rowGroupField = this.resolveFieldData(row, this.groupField);
        if (index >= 0) {
            this.expandedRowsGroups.splice(index, 1);
            this.onRowGroupCollapse.emit({
                originalEvent: event,
                group: rowGroupField
            });
        } else {

            if (this.rowGroupExpandMode === 'single') {
                this.expandedRowsGroups = [];
            }

            this.expandedRowsGroups.push(rowGroupField);
            this.onRowGroupExpand.emit({
                originalEvent: event,
                group: rowGroupField
            });
        }
        event.preventDefault();
    }

    public reset() {
        this._sortField = null;
        this._sortOrder = 1;

        this.filteredValue = null;
        this.filters = {};

        this._first = 0;
        this.firstChange.emit(this._first);
        this.updateTotalRecords();

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            this.updateDataToRender(this.value);
        }
    }

    public exportCSV(options?: any) {
        let data = this.filteredValue || this.value;
        let csv = '\ufeff';

        if (options && options.selectionOnly) {
            data = this.selection || [];
        }

        // headers
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].field) {
                csv += '"' + (this.columns[i].header || this.columns[i].field) + '"';

                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }

        // body
        data.forEach((record, i) => {
            csv += '\n';
            // tslint:disable-next-line:no-shadowed-variable
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].field) {
                    csv += '"' + this.resolveFieldData(record, this.columns[i].field) + '"';

                    if (i < (this.columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
        });

        const blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });

        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        } else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            } else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    getRowStyleClass(rowData: any, rowIndex: number) {
        let styleClass = 'ui-widget-content';
        if (this.rowStyleClass) {
            const rowClass = this.rowStyleClass.call(this, rowData, rowIndex);
            if (rowClass) {
                styleClass += ' ' + rowClass;
            }
        } else if (this.rowStyleMap && this.dataKey) {
            const rowClass = this.rowStyleMap[rowData[this.dataKey]];
            if (rowClass) {
                styleClass += ' ' + rowClass;
            }
        }

        return styleClass;
    }

    visibleColumns() {
        return this.columns ? this.columns.filter(c => !c.hidden) : [];
    }

    get containerWidth() {
        if (this.scrollable) {
            if (this.scrollWidth) {
                return this.scrollWidth;
            } else if (this.frozenWidth && this.unfrozenWidth) {
                return parseFloat(this.frozenWidth) + parseFloat(this.unfrozenWidth) + 'px';
            }
        } else {
            return this.style ? this.style.width : null;
        }
    }

    hasFrozenColumns() {
        return this.frozenColumns && this.frozenColumns.length > 0;
    }

    ngOnDestroy() {

        if (this.globalFilterFunction) {
            this.globalFilterFunction();
        }

        if (this.resizableColumns) {
            this.unbindColumnResizeEvents();
        }

        this.unbindDocumentEditListener();

        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [
        NgZorroAntdModule.forRoot(),
        CommonModule, SharedModule, PaginatorModule, FormsModule],
    exports: [DataTable, SharedModule],
    entryComponents: [
        DataTable, DTRadioButton, DTCheckbox, ColumnHeaders, ColumnFooters, TableBody, ScrollableView, RowExpansionLoader
    ],
    declarations: [DataTable, DTRadioButton, DTCheckbox, ColumnHeaders, ColumnFooters, TableBody, ScrollableView, RowExpansionLoader]
})
export class DataTableModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DataTableModule,
            providers: []
        };
    }
}
