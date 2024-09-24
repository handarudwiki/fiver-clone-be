import { z, ZodType } from "zod";

class UserValidation {
  static readonly register:ZodType = z.object({
    "email": z.string().email().min(6),
    "password": z.string().min(6),
  })

  static readonly login:ZodType = z.object({
    "email": z.string().email().min(6),
    "password": z.string().min(6)
  })
  

    static readonly refreshToken:ZodType = z.object({
        "refreshToken": z.string().min(6)
    })

    static readonly updateUser:ZodType = z.object({
        "username": z.string().min(6),
        "name": z.string().email().min(6),
        "description": z.string().min(6),
    })
}

export default UserValidation;