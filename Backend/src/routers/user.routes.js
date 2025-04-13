import {Router} from "express";
import {
  registerUser,
  loginUser,
  getCallHistory,
  makeCall,
  updateProfileImages
} from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();


router.route('/register').post(registerUser);

router.route('/login').post(loginUser);


router.route('/make-call').post(makeCall);


router.route('/call-history/:id').get(getCallHistory);


router
  .route('/upload-documents')
  .put(
    verifyUser,
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "idProof", maxCount: 1 }
    ]),
    updateProfileImages
  );

export default router;
