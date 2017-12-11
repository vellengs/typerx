/**
 * 领域对象
 * 
 * @export
 * @class Domain
 */
export class Domain {
	name: string;
	description: string;
	fields: Field[]
}

export class Field {
	type?: string;
	title?: string;
	description?: string;
	widget?: string;
	minimum?: number;
	maximum?: number;
	minlength?: number;
	maxlength?: number;
	visibleIf?: string;
	partten?: string;
	index?: string;
	format?: string;
}