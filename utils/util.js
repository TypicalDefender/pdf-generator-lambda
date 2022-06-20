const path = require('path');

function getDigitalApplicationPDFLocation() {
    const fileName = '<your_pdf_name>.pdf';
    const dirname = '/tmp';
    return path.join(dirname, fileName);
}

function formatObjectToArray(obj) {
    const arr = [];
    Object.entries(obj).forEach(([key, value]) => {
        arr.push({
            key,
            value,
        });
    });
    return arr;
}

module.exports = {
    getDigitalApplicationPDFLocation,
    formatObjectToArray,
};
