const multer  = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

module.exports = class UploadUtils {

    constructor(directoryPath = 'uploads/default') {
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
              fs.mkdirSync(directoryPath, { recursive: true })
              cb(null, directoryPath)
            },
            filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname)) //Appending extension
            }
        })
    }

    uploadFile (type = /jpg|jpeg|png/, fileSize = 3000000) {
        try{
            return  multer({ 
                storage: this.storage,
                limits: {fileSize: fileSize},   // This limits file size to 3 million bytes(2mb)
                fileFilter: (req, file, cb) => {
                    
                    const validFileTypes = type // Create regex to match jpg and png
            
                    // Do the regex match to check if file extenxion match
                    const extname = validFileTypes.test(path.extname(file.originalname).toLowerCase())
            
                    if(extname === true){
                        // Return true and file is saved
                         return cb(null, true)
                    }else{
                        // Return error message if file extension does not match
                        return cb("Error: Images Only!")
                    }
                } 
            });
        }
        catch(error){
            console.log("Error get all :", err);
            Error.payload = err.errors ? err.errors : err.message + "Upload limit is 3MB";
            throw new Error();
        }
    }
}