import { Request } from "express";
import prisma from "../helpers/Prisma";
import {
  CreateGigInput,
  GigResponse,
  searchGigQuery,
  toGigResponse,
  UpdateGigInput,
} from "../models/GigModel";
import GigValidation from "../validation/GigValidation";
import Validation from "../validation/Validation";
import { ResponseError } from "../errors/Error";
import fileUpload from "express-fileupload";
import path from "path";
import { deleteFile, uploadFile } from "../helpers/File";
import { User } from "@prisma/client";
import { CreateReviewInput, ReviewResponse, toReviewResponse } from "../models/ReviewModel";
import ReviewValidation from "../validation/ReviewValidation";

class GigService {
  static async create(dto: CreateGigInput, req: Request): Promise<GigResponse> {
    const createRequest: CreateGigInput = Validation.validate(
      GigValidation.create,
      dto
    );

    if (!req.files || !Array.isArray(req.files.images)) {
      throw new ResponseError("Please upload images", 400);
    }

    const files = req.files.images as fileUpload.UploadedFile[];

    const images = await Promise.all(
      files.map(async (file) => {
        return await uploadFile(file, req, "gigs");
      })
    );
    const gig = await prisma.gig.create({
      data: {
        category: createRequest.category,
        delivery_time: createRequest.delivery_time,
        revisions: createRequest.delivery_time,
        short_description: createRequest.short_description,
        features: createRequest.features,
        title: createRequest.title,
        description: createRequest.description,
        price: createRequest.price,
        user_id: createRequest.user_id,
        images,
      },
    });

    return toGigResponse(gig);
  }

  static async update(
    id: number,
    dto: UpdateGigInput,
    req: Request
  ): Promise<GigResponse> {
    const request = await Validation.validate(GigValidation.update, dto);

    const isGigExist = await prisma.gig.findUnique({
      where: {
        id,
      },
    });

    if (!isGigExist) {
      throw new ResponseError("Gig not found", 404);
    }

    let images: string[] = [];
    if (!req.files) {
      throw new ResponseError("pleade upload image", 400);
    } else {
      if (isGigExist.images.length > 0) {
        Promise.all(
          isGigExist.images.map(async (image) => {
            await deleteFile("gigs", path.basename(image));
          })
        );
      }
      const files = req.files.images as fileUpload.UploadedFile[];

      images = await Promise.all(
        files.map(async (file) => {
          return await uploadFile(file, req, "gigs");
        })
      );
    }

    const updatedGig = await prisma.gig.update({
      where: {
        id,
      },
      data: {
        category: request.category,
        delivery_time: request.delivery_time,
        revisions: request.revissions,
        short_description: request.short_description,
        features: request.features,
        title: request.title,
        description: request.description,
        price: request.price,
        images,
      },
    });

    return toGigResponse(updatedGig);
  }

  static async delete(id: number): Promise<void> {
    const gig = await prisma.gig.findUnique({
      where: {
        id,
      },
    });

    if (!gig) {
      throw new ResponseError("Gig not found", 404);
    }

    if (gig.images.length > 0) {
      await Promise.all(
        gig.images.map(async (image) => {
          await deleteFile("gigs", path.basename(image));
        })
      );
    }

    await prisma.gig.delete({
      where: {
        id,
      },
    });
  }

  static async userAuthGig(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        gigs: true,
      },
    });

    return user;
  }

  static async getGigData(id: number): Promise<GigResponse> {
    const gig = await prisma.gig.findUnique({
      where: {
        id,
        price: 10,
      },
      include: {
        reviews: {
          include: {
            reviewer: true,
          },
        },
        user: true,
      },
    });

    const totalReview = gig!.reviews.length;
    const aveRageRating =
      gig!.reviews.length == 0
        ? gig!.reviews.reduce((acc, review) => acc + review.rating, 0) /
          totalReview
        : 0;

    if (!gig) {
      throw new ResponseError("Gig not found", 404);
    }

    return toGigResponse(gig, aveRageRating, totalReview);
  }
  static async getAll(dto: searchGigQuery): Promise<GigResponse[]> {
    const query: searchGigQuery = await Validation.validate(
      GigValidation.search,
      dto
    );

    let filters: any = [];

    if (query.category) {
      filters.OR.push({
        category: {
          contains: query.category,
          mode: "insensitive",
        },
      });
    }

    if (query.keyowrd) {
      filters.OR.push({
        title: {
          contains: query.keyowrd,
          mode: "insensitive",
        },
      });
    }
    const gigs = await prisma.gig.findMany({
      where: filters,
      include: {
        reviews: {
          include: {
            reviewer: true,
          },
        },
        user: true,
      },
    });
    return gigs.map((gig) => toGigResponse(gig));
  }

  static async checkGigOrder(userId: number, gigId: number) : Promise<boolean>{
    const user = await prisma.order.findFirst({
        where:{
            user_id:userId,
            gig_id:gigId
        },
    })

   return  user ? true : false;

  }

  static async addReview(dto:CreateReviewInput): Promise<ReviewResponse>{
        const reviewRequest = Validation.validate(ReviewValidation.create, dto);
    
        const review = await prisma.review.create({
            data:{
                order_id:reviewRequest.order_id,
                rating:reviewRequest.rating,
                review:reviewRequest.text,
                gig_id:reviewRequest.gig_id,
                user_id:reviewRequest.user_id
            },
            include:{
                reviewer:true
            }
        })
        
        return toReviewResponse(review);
       
  }
}

export default GigService;
