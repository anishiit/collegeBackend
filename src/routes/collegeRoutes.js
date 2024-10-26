import {Router} from 'express';
import {registerCollege , loginCollege, getCollegeUsers} from '../controller/collegeController.js'

const collegeRouter = Router();

collegeRouter.route('/register').post(registerCollege);
collegeRouter.route('/login').post(loginCollege);
collegeRouter.route('/getcollegeusers').post(getCollegeUsers);

export {collegeRouter}