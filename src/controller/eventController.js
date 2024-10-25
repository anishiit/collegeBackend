import Event from  "../model/eventModel.js"
import College from "../model/collegeModel.js";

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
        const newEvent  = await Event.create({
            name:name?.trim(),
            collegeId:collegeId?.trim(),
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

export async function getAllEvents (req,res){
    const {collegeId} = req.body;
try {
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

        const {eventId,name,description} = req.body;

        const user = await Event.findById(eventId);
        if(!user){
            return res.status(404).json({
                msg:"No such user Exist with given userId!"
            })
        }

        const updatedUser = await Event.findByIdAndUpdate(eventId,{
            name:name,
            description:description,
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