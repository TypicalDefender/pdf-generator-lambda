const AWS = require('aws-sdk');

/**
 * Contains utility methods for interacting with S3.
 * @class S3Manager
 */
class S3Manager {
    constructor() {
        this.s3bucket = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' });
    }
    /**
     * This function can be used to upload a file to S3 bucket.
     * @param {PutObjectParams} params
     * @returns {Promise<string>} - The URL of the uploaded file.
     */
    putObject(params) {
        return this.s3bucket.putObject(params).promise();
    }
}

module.exports = {
    s3Util: new S3Manager({}),
};
