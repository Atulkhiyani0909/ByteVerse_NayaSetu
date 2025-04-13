import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { getCallHistory, loginLawyer, registerLawyer, updateCall, updateFees } from '../controllers/lawyer.controller.js'

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

    router.route('/update-fees/:id').post(updateFees)

    router.route('/get-call-history/:id').get(getCallHistory)

    router.route('/update-call/:Call_id').post(upload.single("callProof"),updateCall)


export default router