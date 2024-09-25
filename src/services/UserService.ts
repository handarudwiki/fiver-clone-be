import { ResponseError } from "../errors/Error";
import { generateAccessToken, getRefreshToken } from "../helpers/Jwt";
import prisma from "../helpers/Prisma";
import { loginResponse, LoginUserInput, RegisterUserInput, toLoginResponse, toUserResponse, UpdateUserInput, userResponse } from "../models/UserModel";
import UserValidation from "../validation/UserValidation";
import Validation from "../validation/Validation";

class UserService{
    static async register(dto:RegisterUserInput):Promise<userResponse>{
        const registerRequest = Validation.validate(UserValidation.register, dto);

        const emailExist = await prisma.user.findUnique({
            where:{
                email:registerRequest.email
            }
        })

        if(emailExist){
            throw new ResponseError("Email already exist", 400);
        }

        const user = await prisma.user.create({
            data:{
                email:registerRequest.email,
                password:registerRequest.password
            }
        })

        return toUserResponse(user);
    }

    static async login(dto:LoginUserInput):Promise<loginResponse>{
        const loginRequest = Validation.validate(UserValidation.login, dto);

        const user = await prisma.user.findUnique({
            where:{
                email:loginRequest.email
            }
        })

        if(!user){
            throw new ResponseError("Invalid email or password", 400);
        }

        if(user.password !== loginRequest.password){
            throw new ResponseError("Invalid email or password", 400);
        }

        const accessToken = generateAccessToken({id:user.id});
        const refreshToken = getRefreshToken({id:user.id});

        return toLoginResponse(accessToken, refreshToken);
    }

    static async me(id:number):Promise<userResponse>{
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            throw new ResponseError("User not found", 404);
        }

        return toUserResponse(user);
    }

    static async update(id:number, dto:UpdateUserInput):Promise<userResponse>{
        const updateRequest = Validation.validate(UserValidation.updateUser, dto);
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
            throw new ResponseError("User not found", 404);
        }

        const updatedUser = await prisma.user.update({
            where:{
                id
            },
            data:{
                username:dto.username,
                name:dto.name,
                description:dto.description
            }
        })

        return toUserResponse(updatedUser);
    }
}

export default UserService;