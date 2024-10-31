import { Studenthub } from "../db/connection.js";
import { User } from "../db/connection.js";
import { College } from "../db/connection.js";

export async function createStudenthubElement(req, res) {

    try {
        const { title, type, proposedBy, collegeName, description, implementation, status, file } = req.body;
        if(!title || !type || !proposedBy || !collegeName || !description ) {
            return res.status(400).json({
                message: "all mendetory fields are required!"
            })
        }

        if(!(title?.trim()) || !(type?.trim()) || !(proposedBy?.trim()) || !(description?.trim())) {
            return res.status(400).json({
                message: "all mendetory fields are required!"
            })
        }
        
        const student = await User.findById(proposedBy);

        if(!student) {  
            return res.status(404).json({
                message: "No such user exist with given userId!"
            })
        }

        const college = await College.findOne({name:collegeName});

        if(!college._id) {
            return res.status(404).json({
                message: "No such college exist with given collegeName!"  
            })
        }

        const newStudenthub = new Studenthub({
            title: title?.trim(),
            type: type?.trim(),
            proposedBy: student._id,
            collegeId: college._id,
            description: description?.trim(),
            implementation: implementation?.trim(),
            status: status?.trim(),
            file: file?.trim(),
        });

        await newStudenthub.save();

        return res.status(201).json({
            message: "Studenthub problem created successfully!",
            studenthub: newStudenthub
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while creating studenthub element!"
        })
    }
}

export async function getAllCollegeStudenthubElement(req, res) {
    try {
        const {collegeName, collegId} = req.body;

        if(!collegeName && !collegId) {
            return res.status(400).json({    
                message: "Either collegeId or collegeName are required!"
            })
        }
        
        let college;
        if(collegeName){
            college = await College.findOne({name: collegeName});
        }
        if(collegId){
            college = await College.findById(collegId);
        }

        if(!college) {
            return res.status(404).json({   
                message: "No such college exist with given collegeName or collegeId!"
            })
        }

        const studenthub = await Studenthub.find({collegeId: college._id}).populate({path:"collegeId", select:"_id name email"}).sort({createdAt: -1});

        return res.status(200).json({
            message: "studenthub fetched successfully!",
            studenthub
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while fetching college studenthub elements!"
        })
    }
}