import express from "express";
import exelUploadController from "../controller/exel-upload-controller";

const router = express.Router();

router.get('/upload-from-exel', exelUploadController.uploadTextFromExel);

export default router;