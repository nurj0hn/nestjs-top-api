import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class ProdcutCharacteristicDto {
    @IsString()
    name: string;

    @IsString()
    vallue: string;
}

export class CreateProductDto {

    @IsString()
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    oldPrice: number;

    @IsNumber()
    credit: number;

    @IsString()
    description: string;

    @IsString()
    advantages: string;

    @IsString()
    disAdvantages: string;

    @IsArray()
    @IsString({ each: true })
    categories: string[];

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsArray()
    @ValidateNested()
    @Type(() => ProdcutCharacteristicDto)
    characteristics: ProdcutCharacteristicDto[];

}