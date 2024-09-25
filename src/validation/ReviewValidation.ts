import { z, ZodType } from "zod";

class ReviewValidation{
    static readonly create:ZodType = z.object({
        "rating": z.number().int().min(1).max(5),
        "review": z.string().min(6),
        "gig_id": z.number().int().min(1),
        "user_id": z.number().int().min(1),
        "order_id": z.number().int().min(1)
    })
}

export default ReviewValidation;