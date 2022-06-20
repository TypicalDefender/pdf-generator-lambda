const fs = require('fs');
const path = require('path');
const PDFDocument = require('./pdfDocumentWithTables');
const { logger } = require('../../utils/logger');
const dirname = '/tmp'; //__dirname;
class Form {
    constructor(userInfo) {
        this.userInfo = userInfo;
    }

    addPDFHeader(doc) {
        doc.image('logo.png', 50, 45, { width: 50 })
            .fillColor('#444444')
            .fontSize(20)
            .fontSize(10)
            .font('Courier-Bold')
            .text('sarthak.acoustic@gmail.com', 200, 50, { align: 'right' })
            .moveDown();
    }

    generatePDF() {
        // Create The PDF document
        const doc = new PDFDocument();
        const fileName = 'digitalApplicationForm.pdf';
        const writeStream = fs.createWriteStream(path.join(dirname, fileName));
        // Pipe the PDF into a patient's file
        doc.pipe(writeStream);

        this.addPDFHeader(doc);

        //create a new table
        const table = {
            headers: ['', ''],
            rows: [],
        };

        // Add the userInfo to the table
        for (const user of this.userInfo) {
            table.rows.push([user.key, user.value]);
        }

        // Draw the table
        doc.moveDown().createTable(table, 10, 125, { width: 590 });

        // Finalize the PDF and end the stream
        return new Promise((resolve, reject) => {
            writeStream.on('finish', () => {
                resolve(true);
            });
            writeStream.on('err', (err) => {
                logger.error('Error occured in the pdf file stream for uuid', err);
                reject(err);
            });
            doc.end();
        });
    }
}

module.exports = {
    Form,
};
