import {Event} from  "../db/connection.js"
import {College} from "../db/connection.js";

import { uploadImageOnCloudinary } from "../services/cloudinary.js"


export async function postEvent (req,res){
    try {
        const {collegeId , name , description} = req.body;
        
        if(!name || !collegeId || !description ){
            return res.status(400).json({
                message:"all above fields are required!"
            })
        }
        if(!(name?.trim()) || !(collegeId?.trim()) || !(description?.trim())){
            return res.status(400).json({
                message:"all fields are required!"
            })
        }
        console.log(collegeId , name , description);

        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({
                msg:"no such college exist"
            })
        }

        const file = req.file;

        let thumbnailInfo = {}
        if(file){
            const filePath = file.path;
            if(!filePath){
                return res.status(500).json({
                    msg:"Something went wrong while uploading image file"
                })
            }
            const cloudinaryResponse = await uploadImageOnCloudinary(filePath);
            if(!cloudinaryResponse){
                return res.status(500).json({
                    msg:"Something went wrong while uploading on Clodinary"
                })
            }
            thumbnailInfo = {
                ...thumbnailInfo,
                fileUrl:cloudinaryResponse.secure_url,
                asset_id:cloudinaryResponse.asset_id,
                public_id:cloudinaryResponse.public_id,
                api_key:cloudinaryResponse.api_key,
            }
        
            if(!thumbnailInfo){
                return res.status(500).json({
                    msg:"something went wrong!!!"
                })
            }
        }
        //create new event 
        const newEvent  = await Event.create({
            name:name?.trim(),
            collegeId:collegeId?.trim(),
            description:description?.trim(),
            image:thumbnailInfo.fileUrl,
            imageInfo:thumbnailInfo,
        })

        if(!newEvent){
            return res.status(500).json({
                msg:"Something went wrong while creating a event"
            })
        }
        return res.status(201).json({
            msg:"event created successfully",
            event:newEvent,
        })  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong",
            error:error
        })
    }
}

export async function getAllEvents (req,res){
    const {collegeId} = req.body;
try {
    const college = await College.findById(collegeId);
    if(!college){
        return res.status(404).json({
            msg:"No such college exist with given collegeId!"
        })
    }
    const events = await Event.find({collegeId:collegeId});
    if(!events){
        return res.status(404).json({
            msg:"No such user Exist with given userId!" 
        })  
    }  
    return res.status(200).json({
        msg:"events fetched successfully",
        events:events
    })              
} catch (error) {
    console.log(error);  
    return res.status(500).json({
        msg:"Something went wrong",
        error:error 
    }) 
}
}

export async function updateEvent (req,res){
    try {
        // console.log(req.body)
        const {eventId,name,description} = req.body;
        // console.log(eventId)

        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({
                msg:"No such Event exist with given eventId!"
            })
        }

        const updatedUser = await Event.findByIdAndUpdate(eventId,{
            name:name?.trim(),
            description:description?.trim(),
        },{new:true})

        if(!updatedUser){
            return res.status(500).json({
                mesaage:"Couldn't update college try again"
            })
        }
            
        // Now update user =>
        return res.status(201).json({
            mesaage:"College Info updated successfully",
            event:updatedUser,  
        })
    } 
    catch (error) {
        console.log(`uploading error : ${error}`);
        return res.status(500).json({
            msg:"Something went wrong!"
        })
    }
}

export async function deleteEvent (req,res){
    try {
        const {eventId} = req.body;                   
        const user = await Event.findById(eventId);
        if(!user){
            return res.status(404).json({
                msg:"No such Event exist with given eventId!"
            })
        }
        const deletedUser = await Event.findByIdAndDelete(eventId);
        if(!deletedUser){
            return res.status(500).json({
                mesaage:"Couldn't delete Event try again" 
            })
        }
        return res.status(201).json({
            mesaage:"Event deleted successfully",
            event:deletedUser,  
        })
    } 
    catch (error) {
        console.log(`uploading error : ${error}`);
        return res.status(500).json({
            msg:"Something went wrong!"
        })      
    }
}