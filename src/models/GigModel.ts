import { Review } from "./ReviewModel";

export type CreateGigInput = {
    title: string;
    description: string;
    price: number;
    category: string;
    revissions : number;
    delivery_time : number;
    short_description : string;
    features : string[];
    user_id: number
}

export type searchGigQuery = {
    category?: string;
    keyowrd?: number;
}

export type UpdateGigInput = {
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    revissions ?: number;
    delivery_time ?: number;
    short_description ?: string;
    features ?: string[];
    user_id: number;
}

export type GigResponse = {
    title: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    revissions : number;
    delivery_time : number;
    short_description : string;
    features : string[];
    average_rating?: number;
    total_reviews?: number;
    reviews?: Review[];
}

export function toGigResponse(gig:any, rating?:number, totalReview?:number):GigResponse{
    return {
        title: gig.title,
        description: gig.description,
        price: gig.price,
        category: gig.category,
        images: gig.images,
        revissions: gig.revisions,
        delivery_time: gig.delivery_time,
        short_description: gig.short_description,
        features: gig.features,
        average_rating: rating,
        total_reviews: totalReview,
        reviews: gig.reviews
    }
}