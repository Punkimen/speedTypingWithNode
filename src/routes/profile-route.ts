import express from 'express';
import {ProfileController} from "../controller/profile-controller";


const router = express.Router();

const profileController = new ProfileController()

router.get('/stats',  profileController.getStats);

export default router;