import { Request } from "express";
import fileUpload from "express-fileupload";
import path from "path"
import { ResponseError } from "../errors/Error";
import fs from "fs"

export const uploadFile = async(file:fileUpload.UploadedFile, req:Request, folder:string):Promise<string>=>{
    const allowExt = ['.png', '.jpg','.jpeg']
    const image = file.name
    const ext = path.extname(image)
    const fileName = file.md5 + ext

    if(!allowExt.includes(ext.toLowerCase())){
        throw new ResponseError(`Invalid type file`, 400)
    }

    await new Promise<void>((resoleve, reject)=>{
        (file as fileUpload.UploadedFile).mv(`./public/images/${folder}/${fileName}`, (err)=>{
            if(err){
                reject(err)
            }
            resoleve()
        })
    })
    
    return `${req.protocol}://${req.get('host')}/images/${folder}/${fileName}`
}

export const deleteFile =async(folder:string, fileName:string)=>{
    const imagePath = path.join(__dirname, `./public/images/${folder}/${fileName}`)
    if(fs.existsSync(imagePath))await  fs.unlinkSync(imagePath)
}   