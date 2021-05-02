const AWS = require('aws-sdk');
const env = require('./index');

const s3Client = new AWS.S3({
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: env.REGION
})

var uploadParams = {
    Bucket: env.BUCKET,
    Key: '',    // file name
    Body: null, // file content
    ACL: 'public-read'
}

const folder = {
    IMAGES: "images/",
    MUSIC: "music/"
}

module.exports = {
    s3Client,
    uploadParams,
    folder
}