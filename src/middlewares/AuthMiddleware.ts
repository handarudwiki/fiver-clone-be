import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../errors/Error';
import { verifyAccessToken } from '../helpers/Jwt';
import prisma from '../helpers/Prisma';
export const AuthMiddleware= async(req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] as string;

    if(!token) {
        next(new ResponseError('Unauthenticated',401));
    }

    const decoded = verifyAccessToken(token);

    if(!decoded) {
        next(new ResponseError('Invalid token',401));
    }

    const user = await prisma.user.findUnique({
        where:{
            id: decoded.id
        }
    })

    if(!user) {
        next(new ResponseError('Unauthenticated',401));
    }

    req.body = user;
    return next();
}