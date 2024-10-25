import College from '../model/collegeModel.js'

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
        // if(college.isVefified === false){
        // return res.status(401).json({msg: 'Your college is not verified yet'})
        // }
        if(password?.trim() !== college.password){
            return res.status(401).json({msg: 'Invalid password'})
        }
        const coll = await College.findOne({email}).select("-password");

        return res.status(200).json({
            msg: ' logged in successfuly',
            college: coll
        })
    } catch (error) {
        console.log(error);

       return res.status(500).json({msg: 'Something went wrong during college login'})
    }
}

export {
    registerCollege,
    loginCollege
}