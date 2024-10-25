import {Router} from 'express';
import {registerCollege , loginCollege} from '../controller/collegeController.js'

const collegeRouter = Router();

collegeRouter.route('/register').post(registerCollege);
collegeRouter.route('/login').post(loginCollege);

export {collegeRouter}