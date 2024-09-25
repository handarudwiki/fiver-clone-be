import { userResponse } from "./UserModel";

export type Review = {
    text: string;
    rating: number;
    reviewer: userResponse
}

export type CreateReviewInput = {
    review: string;
    rating: number;
    gig_id: number;
    user_id: number;
    order_id: number;
}

export type ReviewResponse = {
    text: string;
    rating: number;
    reviewer: userResponse
}

export  function toReviewResponse(review:any):ReviewResponse{
    return {
        text: review.review,
        rating: review.rating,
        reviewer: review.reviewer
    }
}