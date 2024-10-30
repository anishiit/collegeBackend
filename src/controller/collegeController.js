import {College} from "../db/connection.js";
import { User } from "../db/connection.js";

export async function registerCollege (req,res,next){
    try {
        const {collegeName , plan ,phone , website , linkedin ,email , password} = req.body;
        const existingCollege =await College.findOne({email});
        if(existingCollege){
            return res.status(400).json({error : "A college with this email already exist"});
        }

        const college = new College({
            name: collegeName,
            plan,
            phone,
            website ,
            linkedin ,
            email ,
            password
        })
        await college.save();
        res.status(201).json({message : 'College registered Successfully' , collegeId : college._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Something went wrong during college Registration'})
    }
}

export async function loginCollege(req , res,next){
    try {
        const {email , password} = req.body;
        const college = await College.findOne({email});
        if(!college){
            return res.status(404).json({msg: 'No such college exist'})
        }
        
        if(password?.trim() !== college.password){
            return res.status(401).json({msg: 'Invalid password'})
        }
        const coll = await College.findOne({email}).select("-password");
        if(coll.isVerified == false){
            return res.status(401).json({msg:"Your College is not verified yet!"})
        }
        return res.status(200).json({
            msg: ' logged in successfuly',
            college: coll
        })
    } catch (error) {
        console.log(error);

       return res.status(500).json({msg: 'Something went wrong during college login'})
    }
}

export async function getAllColleges(req, res){
    try {
      const colleges =  await College.find({isVerified: true});
    return res.status(200).json({
        msg: 'Colleges fetched successfully',
        colleges
    })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : " Something went wrong while fetching colleges"

        })
    }
}

export async function getNonVarifiedColleges(req, res){
    try {
       const colleges = await College.find({isVerified: false})
       return res.status(200).json({
           msg: 'Colleges fetched successfully',
           colleges
       })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong while fetching non verified colleges'
        })
    }
}

export async function verifyCollege(req, res){
    try {
        const {collegeId} = req.body;
        const college= await College.findById(collegeId);
        if(!college){
            return res.status(404).json({
                msg: 'No such college exist'
            })
        }
       
        if(college.isVerified == true){
            return res.status(400).json({
                msg: 'This college is already verified'
            })
        }
        await College.findByIdAndUpdate(college._id , {isVerified: true})
        .then(()=>{
             return res.status(200).json({
            msg: 'College verified successfully'
        })
        }).catch((err)=>{
            console.log(err)
            return res.status(500).json({
                msg: 'Something went wrong while verifying college!!'
            })
        })
       
    
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong while verifying college'
        })
    }
}

export async function deleteCollege(req, res){
    try {
        const {collegeId} = req.body;
        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({
                msg: 'No such college exist'
            })
        }
        await College.findByIdAndDelete(college._id)
        .then(()=>{
            return res.status(200).json({
                msg: 'College deleted successfully'
            })
        }).catch((err)=>{
            console.log(err)
            return res.status(500).json({
                msg: 'Something went wrong while deleting college!!'
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong while deleting college'
        })
        }
}
export async function blockCollege(req, res){
    try {
        const {collegeId} = req.body;
        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({
                msg: 'No such college exist'
            })
        }
        await College.findByIdAndUpdate(college._id , {isBlocked: true})
        .then(()=>{
            return res.status(200).json({
                msg: 'College blocked successfully'
            })
        }).catch((err)=>{
            console.log(err)
            return res.status(500).json({
                msg: 'Something went wrong while blocking college!!'
            })
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong while blocking college'
        })
        }
}
export async function getCollegeUsers(req, res){
    try {
        const {collegeName} = req.body;
        const college = await College.findOne({name: collegeName});
        if(!college){
            return res.status(404).json({msg: 'No such college exist'})
        }
        const users = await User.find({collegeName: collegeName});

        return res.status(200).json({
            msg: 'Users fetched successfully',
            users: users
        })

    } catch (error) {
        return res.status(500).json({msg: 'Something went wrong while fetching college users!'})
    }
}

// export async function delete 