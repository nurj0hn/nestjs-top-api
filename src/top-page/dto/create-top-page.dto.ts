import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsString, Max, Min, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { TopLevelCategory } from "../top-page.model";


export class HhData {
    @IsNumber()
    count: number;

    @IsNumber()
    juniorCelery: number;

    @IsNumber()
    middleCelery: number;

    @IsNumber()
    seniorCelery: number;
}


export class TopPageAdvantages {
	@IsString()
	title: string;

    @IsString()
	description: string;
}

export class CreateTopPageDto {
    @IsEnum(TopLevelCategory)
    firstLevelCategory: TopLevelCategory


    @IsString()
    secondCategory: string

    @IsString()
    title: string

    @IsString()
    alias: string

    @IsString()
    category: string

    @IsString()
    seotext: string

    @IsString()
    tagsTitle: string

    @IsArray()
    @IsString({ each: true })
    tags: string[];


    @ValidateNested()
    @Type(() => HhData)
    hh: HhData;

    @IsArray()
    @ValidateNested()
    @Type(() => TopPageAdvantages)
    advantages: TopPageAdvantages[];


    // @IsString()
    // typegooseName: string | null; // add this property
}