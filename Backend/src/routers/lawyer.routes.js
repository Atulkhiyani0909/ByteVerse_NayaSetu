import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { registerLawyer } from '../controllers/lawyer.controller.js'

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

    ),
    registerLawyer
)

export default router