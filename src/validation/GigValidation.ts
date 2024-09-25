import { z, ZodType } from "zod";

class GigValidation{
    static readonly create:ZodType = z.object({
        "title": z.string().min(6).optional(),
        "description": z.string().min(6),
        "price": z.number().int().min(1),
        "category": z.string().min(6),
        "revissions": z.number().int().min(1),
        "features": z.array(z.string()),
        "user_id": z.number().int().min(1)
    })

    static readonly update:ZodType = z.object({
        "title": z.string().min(6).optional(),
        "description": z.string().min(6).optional(),
        "price": z.number().int().min(1).optional(),
        "category": z.string().min(6).optional(),
        "revissions": z.number().int().min(1).optional(),
        "features": z.array(z.string()),
    })

    static readonly search:ZodType = z.object({
        "category": z.string().min(6).optional(),
        "keyword": z.string().min(6).optional()
    })
}

export default GigValidation;