export class CreateReviewDto {
    name: string;
    title: string;
    description: string;
    rating: number;
    productId: string;
    typegooseName: string | null; // add this property
}