import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { userMiddleware } from '../middlewares/auth.middleware.js'
import { getCallHistory, lawyerProfile, loginLawyer, registerLawyer, updateCall, updateFees } from '../controllers/lawyer.controller.js'

const router=Router()

router.route('/register').post(
    upload.fields(
        [
            {
                name: 'image',
                 maxCount: 1
            },
            {
                 name: 'gov_id',
                 maxCount: 1
            }
        ]

    ), registerLawyer )


    router.route('/login').post(loginLawyer)

    router.route('/update-fees').put(userMiddleware,updateFees)

    router.route('/get-call-history').get(userMiddleware,getCallHistory)

    router.route('/update-call/:Call_id').put(userMiddleware,upload.single('proof'), updateCall);

    router.route('/profile/:id').get(lawyerProfile);



export default router