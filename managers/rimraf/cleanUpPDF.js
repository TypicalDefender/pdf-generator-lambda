const { logger } = require('../../utils/logger');
const rimraf = require('rimraf');

class RimRaf {
    constructor(pdfPath) {
        this.pdfPath = pdfPath;
    }

    cleanUp() {
        return new Promise((resolve, reject) => {
            rimraf(this.pdfPath, (err) => {
                if (err) {
                    logger.error('cleanUpPdf-error', `$${this.pdfPath}`);
                    reject(err);
                } else {
                    logger.log('cleanUpPdf-success', `${this.pdfPath}`);
                    resolve(42);
                }
            });
        });
    }
}

module.exports = {
    RimRaf,
};
