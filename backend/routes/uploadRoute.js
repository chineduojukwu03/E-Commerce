import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()




const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'upload/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()} ${path.extname(file.originalname)}`)

    }

})

function checkFileType(file, cb) {
    const filetype = /jpg|jepg|png/
    const extname = filetype.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetype.test(file.mimetype)
    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('image only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`${req.file.path}`)
})

export default router