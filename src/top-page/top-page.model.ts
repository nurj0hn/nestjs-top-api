import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";


export interface TopPageModel extends Base { }

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageAdvantages {
	@prop()
	title: string;

	@prop()
	description: string;
}

export class HhData {
	@prop()
	count: number;

	@prop()
	juniorCelery: number;

	@prop()
	middleCelery: number;

	@prop()
	seniorCelery: number;
}

export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory;

	@prop()
	secondCategory: string;

	@prop()
	title: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	category: string;

	@prop({ type: () => HhData })
	hh?: HhData

	@prop({ type: () => [TopPageAdvantages] })
	advantages: TopPageAdvantages[];

	@prop()
	seotext: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];

}
