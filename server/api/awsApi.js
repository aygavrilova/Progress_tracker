require("dotenv").config();
const AWS = require('aws-sdk')
const fs = require('fs')

const { AWS_BUCKET_NAME, AWS_REGION,AWS_ACCESS_KEY,AWS_SECRET_KEY } = process.env;

const s3Config = {
    apiVersion: '2006-03-01',
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
}

const s3 = new AWS.S3(s3Config)

const uploadFile = (file)=>{
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

const getFileStream = (fileKey)=>{
    const downloadParams = {
        Key: fileKey,
        Bucket: AWS_BUCKET_NAME
    }
    return s3.getObject(downloadParams).createReadStream()
}

module.exports = {uploadFile,getFileStream}
