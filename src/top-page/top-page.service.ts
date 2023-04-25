import { Injectable } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { text } from 'express';

@Injectable()
export class TopPageService {

    constructor(@InjectModel(TopPageModel) private readonly topageModel: ModelType<TopPageModel>) { };

    async create(dto: CreateTopPageDto) {
        // return this.topageModel.create(dto);
        const topPage = new this.topageModel({
            firstLevelCategory: dto.firstLevelCategory,
            secondCategory: dto.secondCategory,
            title: dto.title,
            alias: dto.alias,
            category: dto.category,
            seotext: dto.seotext,
            tagsTitle: dto.tagsTitle,
            tags: dto.tags,
            hh: dto.hh,
            advantages: dto.advantages,


        })

        return topPage.save()
    }

    async findById(id: string) {
        return await this.topageModel.findById(id).exec();
    }

    async deleteById(id: string) {
        return await this.topageModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return await this.topageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async getAll() {
        return await this.topageModel.find().exec();
    }

    async search(text: string) {
        return await this.topageModel.find({ $text: { $search: text, $caseSensitive: false, } }).exec();
    }


}
