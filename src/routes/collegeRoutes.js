import {Router} from 'express';
import {registerCollege , loginCollege, getCollegeUsers ,getAllColleges ,getNonVarifiedColleges ,verifyCollege} from '../controller/collegeController.js'

const collegeRouter = Router();

collegeRouter.route('/register').post(registerCollege);
collegeRouter.route('/login').post(loginCollege);
collegeRouter.route('/getcollegeusers').post(getCollegeUsers);
collegeRouter.route('/verifycollege').post(verifyCollege); //colegeId
collegeRouter.route('/getallcolleges').post(getAllColleges);
collegeRouter.route('/getnonverifiedcolleges').post(getNonVarifiedColleges);


export {collegeRouter}