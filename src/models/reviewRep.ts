import { UserInfo } from "./auth";

export interface ReviewRep{

            id:number,
            user: UserInfo,
            message: string,
            date: string,
        
}