import { NextFunction, Request, Response } from "express";
import { LoginUserInput, RegisterUserInput, UpdateUserInput } from "../models/UserModel";
import UserService from "../services/UserService";

class UserController {
    static async register(req:Request, res:Response, next:NextFunction){
        try {
            const dto:RegisterUserInput = req.body;
            
            const user = await UserService.register(dto);

            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async login(req:Request, res:Response, next:NextFunction){
        try {
            const dto:LoginUserInput = req.body;
            
            const user = await UserService.login(dto);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async me(req:Request, res:Response, next:NextFunction){
        try {
            const user = await UserService.me(req.body.user.id);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async update(req:Request, res:Response, next:NextFunction){
        try {
            const dto:UpdateUserInput = req.body;
            const user = await UserService.update(req.body.user.id, dto);

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;