import {College} from "../db/connection.js";
import { User } from "../db/connection.js";

async function registerCollege (req,res,next){
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

async function loginCollege(req , res,next){
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
        if(coll.isBlocked == true){
            return res.status(401).json({msg:"Your College is blocked! Please contact Admin"})
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

async function getAllColleges(req, res){
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

async function getAllCollegeCount(req, res){
    try {
       const count = await College.countDocuments();
       return res.status(200).json({
           msg: 'Count fetched successfully',
           count
       })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong while fetching count'
        })
    }
}
async function getNonVarifiedColleges(req, res){
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

async function verifyCollege(req, res){
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

async function deleteCollege(req, res){
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

async function blockCollege(req, res){
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

async function getCollegeUsers(req, res){
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

async function addFeaturedAlumni(req, res) {
    try {
      const { collegeName, alumniDetail } = req.body;
  
      // Validate input
      if (!collegeName || !alumniDetail) {
        return res.status(400).json({ msg: "Please provide all required fields (collegeName and alumniDetail)." });
      }
  
      // Check if college exists
      const college = await College.findOne({ name: collegeName });
      if (!college) {
        return res.status(404).json({ msg: "No college found with the given name." });
      }
  
      // Add featured alumni
      const updatedCollege = await College.findOneAndUpdate(
        { name: collegeName },
        { $push: { featuredAlumni: alumniDetail } }, // $push adds to the array
        { new: true } // Returns the updated document
      );
  
      return res.status(200).json({
        msg: "Featured Alumni added successfully.",
        college: updatedCollege
      });
    } catch (error) {
      console.error("Error adding featured alumni:", error);
      return res.status(500).json({
        msg: "Something went wrong while adding featured alumni!",
        error: error.message
      });
    }
}

async function removeFeaturedAlumni(req, res) {
    try {
      const { collegeName, alumniId } = req.body;
  
      if (!collegeName || !alumniId) {
        return res.status(400).json({ msg: "Please provide all required fields (collegeName and alumniId)." });
      }
  
      const college = await College.findOne({ name: collegeName });
      if (!college) {
        return res.status(404).json({ msg: "No college found with the given name." });
      }
  
      const updatedCollege = await College.findOneAndUpdate(
        { name: collegeName },
        { $pull: { featuredAlumni: { _id: alumniId } } }, // $pull removes from the array
        { new: true } // Returns the updated document    
      );    

      return res.status(200).json({
        msg: "Featured Alumni removed successfully.",
        college: updatedCollege,
      })

    }
    catch (error) {
        console.error("Error removing featured alumni:", error);
        return res.status(500).json({
          msg: "Something went wrong while removing featured alumni!",
          error: error.message
        });
    }   
}          
  
// export async function delete 


export {
    registerCollege,
    loginCollege,
    getAllColleges,
    getAllCollegeCount,
    getNonVarifiedColleges,
    verifyCollege,
    deleteCollege,
    blockCollege,
    getCollegeUsers,
    addFeaturedAlumni,
    removeFeaturedAlumni,
}
