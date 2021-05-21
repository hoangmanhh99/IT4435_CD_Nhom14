const s3 = require('../configs/s3.config');
const CustomError = require('../errors/CustomError');
const firebase = require('../configs/firebase');

const uploadToS3 = async (buffer, originalName, type) => {

    s3.uploadParams.Body = buffer;
    switch(type) {
        case s3.folder.IMAGES:
            s3.uploadParams.Key = s3.folder.IMAGES + originalName;
            break;
        case s3.folder.MUSIC:
            s3.uploadParams.Key = s3.folder.MUSIC + originalName;
            break;
        default:
            s3.uploadParams.Key = originalName;
            break;
    }

    try{
        let result = await s3.s3Client.upload(s3.uploadParams).promise();
        console.log("thanh cong roi s3: ", result);
        return result.Location;
    }catch(err){
        console.log("co loi xay ra tren aws s3");
        console.log(err);
        throw new CustomError(codes.UPLOAD_FILE_ERROR, "upload file error");
    }
    
}

/**
 * 
 * @param {*} objects list file bao gom coverImage va file mp3/mp4
 */
const uploadMusicToS3 = async (objects) => {
    
}



const uploadFirebase = async(file, type) =>{
    
    let folder ='' ;
    switch(type) {
        case s3.folder.IMAGES:
            folder= s3.folder.IMAGES ;
            break;
        case s3.folder.MUSIC:
            folder= s3.folder.MUSIC ;
            break;
        default:
            folder= s3.folder.IMAGES ;
            break;
    }
    const blob =  firebase.bucket.file(folder+file.originalname) ;
    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
        public: true,
        metadata:{ contentType: file.mimetype }
    })
    blobStream.on('error', (err) => {
        console.log(err)
    });
    try{

    }catch(err){
        console.log("co loi xay ra tren aws s3");
        console.log(err);
        throw new CustomError(codes.UPLOAD_FILE_ERROR, "upload file error");
        
    }
     blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        console.log("finish upload to firebase") ;
        });
    const publicUrl =('https://storage.googleapis.com/'+ firebase.bucket.name + '/' + blob.name) ;
    blobStream.end(file.buffer) ;
    return publicUrl ;

}

module.exports = {
    uploadToS3 , uploadFirebase
}