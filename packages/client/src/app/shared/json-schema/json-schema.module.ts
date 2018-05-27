import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DelonFormModule, WidgetRegistry } from '@delon/form';

import { TinymceWidget } from './widgets/tinymce/tinymce.widget';
import { UeditorWidget } from './widgets/ueditor/ueditor.widget';
import { SearchWidgetComponent } from './widgets/search/search.widget';
import { ListBoxWidgetComponent } from './widgets/list-box/list-box';
import { DictWidgetComponent } from './widgets/dict/dict.widget';
import { TreeWidgetComponent } from './widgets/tree/search.widget';
import { ChoicesWidgetComponent } from '@shared/json-schema/widgets/choices/choices.widget';
import { ImageWidgetComponent } from '@shared/json-schema/widgets/image/image.widget';
import { AvatarWidgetComponent } from '@shared/json-schema/widgets/avatar/avatar.widget';

export const SCHEMA_THIRDS_COMPONENTS = [
    TinymceWidget,
    UeditorWidget,
    SearchWidgetComponent,
    ListBoxWidgetComponent,
    DictWidgetComponent,
    TreeWidgetComponent,
    ChoicesWidgetComponent,
    ImageWidgetComponent,
    AvatarWidgetComponent,
];

@NgModule({
    declarations: SCHEMA_THIRDS_COMPONENTS,
    entryComponents: SCHEMA_THIRDS_COMPONENTS,
    imports: [
        SharedModule,
        DelonFormModule.forRoot()
    ],
    exports: [
        ...SCHEMA_THIRDS_COMPONENTS
    ]
})
export class JsonSchemaModule {
    constructor(widgetRegistry: WidgetRegistry) {
        widgetRegistry.register(TinymceWidget.KEY, TinymceWidget);
        widgetRegistry.register(UeditorWidget.KEY, UeditorWidget);
        widgetRegistry.register(SearchWidgetComponent.KEY, SearchWidgetComponent);
        widgetRegistry.register(ListBoxWidgetComponent.KEY, ListBoxWidgetComponent);
        widgetRegistry.register(DictWidgetComponent.KEY, DictWidgetComponent);
        widgetRegistry.register(TreeWidgetComponent.KEY, TreeWidgetComponent);
        widgetRegistry.register(ChoicesWidgetComponent.KEY, ChoicesWidgetComponent);
        widgetRegistry.register(ImageWidgetComponent.KEY, ImageWidgetComponent);
        widgetRegistry.register(AvatarWidgetComponent.KEY, AvatarWidgetComponent);

    }
}
