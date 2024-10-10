import express from 'express';
import {UserController} from '../controller/user-controller';

const router = express.Router();
const controller = new UserController();

router.get('/users', controller.getUser);
router.post('/users', controller.createUser);
router.delete('/users', controller.deleteUser);

export default router;