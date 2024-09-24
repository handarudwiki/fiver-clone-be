import {User} from "@prisma/client";
export type RegisterUserInput = {
    email: string;
    password: string;
}

export type LoginUserInput = {
    email: string;
    password: string;
}

export type userResponse = {
    email: string;
    username?: string;
    name?: string;
    description?: string;
    avatar?: string;

}

export type UpdateUserInput = {
    username: string;
    name: string;
    description: string;
}

export type loginResponse = {
    accessTooken: string;
    refreshToken: string;
}

export function toUserResponse(user: User): userResponse {
    return {
        email: user.email,
        username: user.username ?? undefined,
        name: user.name ?? undefined,
        description: user.description ?? undefined,
        avatar: user.avatar ?? undefined,
    }
}

export function toLoginResponse(accessToken: string, refreshToken: string): loginResponse {
    return {
        accessTooken: accessToken,
        refreshToken: refreshToken,
    }
}