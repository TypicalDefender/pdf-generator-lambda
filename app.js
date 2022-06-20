// Import dependencies
const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");

// Load the patients 
const patients = require("./patients.json");

// Create The PDF document
const doc = new PDFDocument();

// Pipe the PDF into a patient's file
doc.pipe(fs.createWriteStream(`sliceDigitalApplication.pdf`));

// Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .fontSize(10)
    .font("Courier-Bold")
    .text("www.sliceit.com", 200, 50, { align: "right" })
    .text("help@sliceit.com", 200, 65, { align: "right" })
    .text("+91-8047096430", 200, 80, { align: "right" })
    .moveDown();

// Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
const table = {
    headers: ["", ""],
    rows: []
};

// Add the patients to the table
for (const patient of patients) {
    table.rows.push([patient.a, patient.b])
}

// Draw the table
doc.moveDown().table(table, 10, 125, { width: 590 });

// Finalize the PDF and end the stream
doc.end();