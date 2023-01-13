const router = require('express').Router();
const multer = require('multer');
const path = require('path')

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
        
    }
})

let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 100},
}).single('myfile');
// Main
router.post('/', (req, res) => {
    // Validate Request

    if (!req.file) {
        return res.json({ error: ' Error all fields are required, Code - 402' })
    }


    //STore file
        upload()

           
    // STORE TO  Database


    // Response -> Link

})




module.exports = router;