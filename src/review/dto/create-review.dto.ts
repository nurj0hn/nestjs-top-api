import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @Max(5)
    @Min(1, {message: "гавно собачье"})
    @IsNumber()
    rating: number;

    @IsString()
    productId: string;

    // @IsString()
    // typegooseName: string | null; // add this property
}