import express from "express";
import TextsController from "../controller/texts-controller";

const router = express.Router();

router.get('/texts', TextsController.getTexts);

export default router;