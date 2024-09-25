import { NextFunction, Request, Response } from "express";
import GigService from "../services/GigService";
import { CreateGigInput, UpdateGigInput } from "../models/GigModel";
import { CreateReviewInput } from "../models/ReviewModel";

class GigController {
    static async create(req:Request, res:Response, next:NextFunction){
        try {
            const dto:CreateGigInput ={
                category:req.body.category,
                delivery_time:req.body.delivery_time,
                revissions:req.body.revisions,
                short_description:req.body.short_description,
                features:req.body.features,
                title:req.body.title,
                description:req.body.description,
                price:req.body.price,
                user_id:req.body.user.id
            }
            const gig = await GigService.create(req.body, req);
            res.status(201).json(gig);
        } catch (error) {
            next(error);
        }

    }
    
    
    static async update(req:Request, res:Response, next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const dto:UpdateGigInput = {
                category:req.body.category,
                delivery_time:req.body.delivery_time,
                revissions:req.body.revisions,
                short_description:req.body.short_description,
                features:req.body.features,
                title:req.body.title,
                description:req.body.description,
                price:req.body.price,
                user_id:req.body.user.id
            }

            const gig = await GigService.update(id , dto,req);
            res.status(200).json(gig);
        } catch (error) {
            next(error);
        }
    }

    static async chechGigOrder(req:Request, res:Response, next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const user = req.body.user;
            const gig = await GigService.checkGigOrder(id, user.id);
            res.status(200).json(gig);
        } catch (error) {
            next(error);
        }
    }

    static async getALl(req:Request, res:Response, next:NextFunction){
        try {
            const query = req.query;
            const gigs = await GigService.getAll(query);
            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    }

    static async addReview(req:Request, res:Response, next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const user = req.body.user;
            const dto:CreateReviewInput = {
                rating:req.body.rating,
                review:req.body.review,
                gig_id:id,
                user_id:user.id,
                order_id:req.body.order_id
            };
            const review = await GigService.addReview(dto);
            res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req:Request, res:Response, next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            await GigService.delete(id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
    static async userAuthGig(req:Request, res:Response, next:NextFunction){
        try {
            const user = req.body.user;
            const gigs = await GigService.userAuthGig(user.id);
            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req:Request, res:Response, next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const gig = await GigService.getGigData(id);
            res.status(200).json(gig);
        } catch (error) {
            next(error);
        }
    }
}

export default GigController;