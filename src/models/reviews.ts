import { UserInfo } from "./auth";
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
}