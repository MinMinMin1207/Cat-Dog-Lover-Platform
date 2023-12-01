import express from 'express'
import { DataResponse, MessageResponse } from '../common/reponses.js'

import fileUpload from 'express-fileupload'
// import authUser from '../middlewares/auth.js'

import { requireRole } from '../middlewares/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(MessageResponse('Welcome to my server'))
})

router.get('/do_something', requireRole('US'), (req, res) => {
    const userData = res.locals.userData
    res.json(MessageResponse(`You are login as ${userData.role}`))
})

router.post('/upload', fileUpload(), (req, res) => {
    const filename = req.body.filename
    const image = req.files.image

    const savePath = `public/images/${filename}`
    image.mv(savePath)
    res.json(DataResponse({
        savePath: savePath
    }))
})

export default router
