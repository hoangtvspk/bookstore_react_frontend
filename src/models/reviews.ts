import { UserInfo } from "./auth";
import { BookImage } from "./book";
import { ReviewRep } from "./reviewRep";

export interface Review{
    id:number,
    user:UserInfo,
    reviewReps: [
        ReviewRep
    ],
    date: string,
    message: string,
    rating: number,
    reviewImages: BookImage[],
}