import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/Error";

export const ErrorMiddleware = async (error:Error,req:Request, res:Response, next:NextFunction) =>{
    if(error instanceof ZodError){
        return res.status(400).json({
            message : error.message,
            data: error.errors
        })
    }else if(error instanceof ResponseError){
        return res.status(error.statusCode).json({
            message : error.message
        })
    }else{
        console.log(error)
        return res.status(500).json({
            message : "internal server error"
        })
    }
}