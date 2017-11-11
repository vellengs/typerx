import { EntityProperties, WidgetTypes as w, DataTypes as t } from 'modex';

export const schema: EntityProperties = {
	name: {
		type: t.string,
		widget: w.string,
		title: '名称',
	}
};

