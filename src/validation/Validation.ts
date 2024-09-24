import { ZodType } from "zod";

class Validation{
    static validate<T>(schehma:ZodType, data:T){
        return schehma.parse(data)
    }
}

export default Validation;