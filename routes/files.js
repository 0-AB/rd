const router = require('express').Router();
const multer = require('multer');
const path = require('path')
const File = require('../models/file')
const {v4: uuid4} = require('uuid')
let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
        
    }
})

let upload = multer({
    storage,
    limit: { fileSize: 1000000 * 240},
}).single('myfile');
// Main
router.post('/', (req, res) => {


   


    //Store file 
        upload( req, res, async (err ) => {
            if (!req.file) {
                return res.json({ error: ' Error all fields are required' })
            }

           if(err){
            return res.status(512).send({error: err.message })
           }
           // STORE TO  Database
            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size
            });
            const response = await file.save();
           // Make sure you give domain name in env file APP_BASE_URL
            return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid} `})
        })

           
    


})

// un
router.post('/send', async (req,res) => {
    const { uuid, emailTo, emailFrom  } = req.body;

     // Validate request
    if(!uuid || !emailTo || !emailFrom){
        return res.status(430).send({error: ' Body are required to '});

    }
    // get data from database   ..
    const file = await File.findOne({uuid: uuid});
    if(file.sender) {
        return res.status(450).send({error: ' Email aleardy sended !'});
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    // send email
    const sendMail = require('../services/emailService');
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'InShare file sharing',
        text: `${emailFrom} shared file by this email`,
        html: require(`../services/email-html`)({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + ' KB',
            expires: `24 Days`
        })
      
    })

    
})


module.exports = router;