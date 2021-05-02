const s3 = require('../configs/s3.config');
const CustomError = require('../errors/CustomError');

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

module.exports = {
    uploadToS3
}