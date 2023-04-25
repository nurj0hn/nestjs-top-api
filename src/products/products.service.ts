import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductsModel } from './products.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-products.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(ProductsModel) private readonly productModel: ModelType<ProductsModel>
    ) { };


    async create(dto: CreateProductDto) {
        const product = new this.productModel({
            image: dto.image,
            title: dto.title,
            price: dto.price,
            oldPrice: dto.oldPrice,
            credit: dto.credit,
            description: dto.description,
            advantages: dto.advantages,
            disAdvantages: dto.disAdvantages,
            categories: dto.categories,
            tags: dto.tags,
            characteristics: dto.characteristics
        });
        return product.save()
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findWithReviews(dto: FindProductDto) {
        return await this.productModel.aggregate([
            {
                $match: {
                    categories: dto.category
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $lookup: {
                    from: "Review",
                    localField: "_id",
                    foreignField: "productId",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: "$reviews" },
                    reviewAvg: { $avg: "$reviews.rating" },
                    reviews: { 
                        $function: {
                            body: `function (reviews) {
                                reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                return reviews;
                            }`,
                            args: ["$reviews"],
                            lang: "js"
                        }
                     },
                    gavno: "$_id"
                }
            }
        ]).exec() as (ProductsModel & {
            review: ReviewModel[] | null,
            reviewCount: number,
            reviewAvg: number
        })[];
    }

}
