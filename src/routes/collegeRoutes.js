import {Router} from 'express';
import {registerCollege , loginCollege, getCollegeUsers ,getAllColleges ,getNonVarifiedColleges ,verifyCollege
     ,deleteCollege , blockCollege ,getAllCollegeCount, addFeaturedAlumni, removeFeaturedAlumni,
    } from '../controller/collegeController.js'

const collegeRouter = Router();

collegeRouter.route('/register').post(registerCollege);
collegeRouter.route('/login').post(loginCollege);
collegeRouter.route('/getcollegeusers').post(getCollegeUsers);
collegeRouter.route('/verifycollege').post(verifyCollege); //colegeId
collegeRouter.route('/getallcolleges').post(getAllColleges);
collegeRouter.route('/getnonverifiedcolleges').post(getNonVarifiedColleges);
collegeRouter.route('/deletecollege').post(deleteCollege);
collegeRouter.route('/blockcollege').post(blockCollege);
collegeRouter.route('/getallcollegecount').post(getAllCollegeCount);

collegeRouter.route('/addfeaturedalumni').post(addFeaturedAlumni); // body-{collegeName, alumniDetail}
collegeRouter.route('/removefeaturedalumni').post(removeFeaturedAlumni); // body-{collegName , alumniId}


export {collegeRouter}
