const fs = require('fs');
const { s3Util } = require('../../managers/aws/s3Manager');
const { getConfig } = require('../../config').configProps;
const { aws } = getConfig();

class PDFStream {
    constructor(pdfPath) {
        this.pdfPath = pdfPath;
    }

    upload() {
        const pdfStream = fs.createReadStream(this.pdfPath);
        const bufferChunks = [];
        return new Promise((resolve) => {
            pdfStream.on('data', (data) => {
                bufferChunks.push(data);
            });

            pdfStream.on('close', async () => {
                const pdfBuffer = new Buffer.concat(bufferChunks);
                const uploadParams = {
                    Key: `application-forms/${process.env['NODE_ENV'].toLowerCase()}/form.pdf`,
                    Body: pdfBuffer,
                    Bucket: aws.s3Bucket,
                    ContentType: 'application/pdf',
                };

                await s3Util.putObject(uploadParams);
                resolve(42);
            });
        });
    }
}

module.exports = {
    PDFStream,
};
