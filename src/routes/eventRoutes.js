import { Router } from "express";
import {postEvent,getAllEvents,updateEvent,deleteEvent} from '../controller/eventController.js'
import { upload } from "../middlewares/multer.js";

const eventRouter = Router();

eventRouter.post('/createevent',postEvent);
eventRouter.route('/getcollegeevents').post(getAllEvents);
eventRouter.route('/updateevent').post(updateEvent);
eventRouter.route('/deleteevent').post(deleteEvent); 

export default eventRouter