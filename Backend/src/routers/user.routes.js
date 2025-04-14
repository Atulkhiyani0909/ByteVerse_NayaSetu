import {Router} from "express";
import {
  registerUser,
  loginUser,
  getCallHistory,
  makeCall,
  updateProfileImages
} from '../controllers/users.controller.js';
import { userMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middleware/multer.js";

const router = Router();


router.route('/register').post(registerUser);

router.route('/login').post(loginUser);


router.route('/make-call/:lawyerId').post(userMiddleware,makeCall);


router.route('/call-history').get(userMiddleware,getCallHistory);


router
  .route('/upload-documents')
  .put(
    userMiddleware,
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "idProof", maxCount: 1 }
    ]),
    updateProfileImages
  );

export default router;
