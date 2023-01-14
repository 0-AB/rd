const router = require('express').Router();
const File = require('../models/file') 

router.get('/:uuid',async  (req, res) => {
    try {
       const file = await File.findOne({  uuid: req.params.uuid  }); 
       if(!file) {
                 
        return res.render('download'), { error: 'Link expired'}     

             } 

           return res.render('download', {
             uuid: file.uuid,
             fileName: file.filename,
             fileSize: file.size,
             downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
             // Make sure you r domain is under of APP_BASE_URL this .env
             // look this like http://example.com/files/download/shasghasgh-ansnaks0-a

           })  
    } catch(err) {
        return res.render('download'), { error: 'Server broken '}
    }
   
});




module.exports = router; 
