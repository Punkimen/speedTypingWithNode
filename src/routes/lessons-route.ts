import express from 'express';
import {LessonsController} from "../controller/lessons-controller";

const router = express.Router();

const lessonsController = new LessonsController()
router.post('/lesson', lessonsController.createLesson);

export default router;