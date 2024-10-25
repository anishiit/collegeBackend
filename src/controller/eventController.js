import Evenet from  "../model/eventModel.js"

import { uploadImageOnCloudinary } from "../services/cloudinary"
import College from "../model/collegeModel.js"
import mongoose from "mongoose";

async function postEvent (req,res){
    try {
        const {college , image , name , description} = req.body;
        
        if(!name || !college || !image || !description ){
            return res.status(400).json({
                message:"all above fields are required!"
            })
        }
        if(!(name?.trim()) || !(college?.trim()) || !(image?.trim()) || !(description?.trim())){
            return res.status(400).json({
                message:"all fields are required!"
            })
        }
        console.log(college , image , name , description);

        const post = await College.findById(college);
        if(!post){
            return res.status(404).json({
                msg:"no such college exist"
            })
        }


        const file = req.file;
        let imageInfo ={}
        if (file){
            const filepath =file.path;
            if(!filepath){
                return res.status(500).json({
                    msg: "Something went wrong while uploading image file"
                })
            }
            const cloudinaryResponse = await uploadImageOnCloudinary(filepath);
            if(!cloudinaryResponse){
                return res.status(500).json({
                    msg:"Something went wrong while uploading image file"
                })
            }
            imageInfo ={
                ...imageInfo,
                fileUrl:cloudinaryResponse.secure_url,
                asset_id:cloudinaryResponse.asset_id,
                public_id:cloudinaryResponse.public_id,
                api_key:cloudinaryResponse.api_key,
            }
        }
        if(!imageInfo){
            return res.status(500).json({
                msg:"something went wrong!!!"
            })
        }
        //create new event 
        const newEvent  = await Evenet.create({
            name:name?.trim(),
            college:college?.trim(),
            description:description?.trim(),
            image:imageInfo?.fileUrl,
            imageInfo:imageInfo,

        })
        if(!newEvent){
            return res.status(500).json({
                msg:"Something went wrong while creating a event"
            })
        }
        return res.status(201).json({
            msg:"event created successfully",
            post:postEvent,
        })  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong",
            error:error
        })
    }
}

async function getAllEvents (req,res){
try {
    const events = await Event.find({})
} catch (error) {
    
}
}

