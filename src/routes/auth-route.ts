import express from 'express';
import {AuthController} from "../controller/auth-controller";

const router = express.Router();

const authController = new AuthController();

router.get('/activate/:link',authController.getActivatedLink)
router.get('/refresh', authController.getRefreshToken)
router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/verify', authController.verify)

export default router;