import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) { }

    async create(dto: CreateReviewDto) { // : Promise<DocumentType<ReviewModel>>
        const review = new this.reviewModel({
            name: dto.name,
            title: dto.title,
            description: dto.description,
            rating: dto.rating,
            productId: dto.productId

        });
        // return this.reviewModel.create(dto);
        return review.save();
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
        return this.reviewModel.find({ productId: productId }).exec();
    }

    async deleteByProductId(productId: string): Promise<DocumentType<ReviewModel>[] | null> {
        return this.reviewModel.deleteMany({ productId: Types.ObjectId(productId) }).exec();
    }

    async getAll() {
        return this.reviewModel.find().exec();
    }
}
