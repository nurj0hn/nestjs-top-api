import { prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";

export class ProdcutCharacteristic {
	@prop()
	name: string;

	@prop()
	vallue: string;
}

export interface ProductsModel extends Base { }

export class ProductsModel extends TimeStamps {

	@prop()
	image: string;

	@prop()
	title: string;

	@prop()
	price: number;

	@prop()
	oldPrice: number;

	@prop()
	credit: number;

	@prop()
	description: string;

	@prop()
	ratingCount: number;

	@prop()
	advantages: string;

	@prop()
	disAdvantages: string;

	@prop({ type: () => [String] })
	categories: string[];

	@prop({ type: () => [String] })
	tags: string[];

	@prop({ type: () => [ProdcutCharacteristic], _id: false })
	characteristics: ProdcutCharacteristic[];

}
