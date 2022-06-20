process.env['APP_HOME'] = process.cwd();
const utils = require('./utils/util');
const { logger } = require('./utils/logger');
const { Form } = require('./managers/pdf/form');
const { RimRaf } = require('./managers/rimraf/cleanUpPDF');
const { PDFStream } = require('./managers/pdf/pdfStream');

const handler = async (event) => {
    logger.log('Generating PDF', event);
    logger.log('The environment variables are', process.env['NODE_ENV'], process.env.mode);
    try {
        const eventList = event.Records || [];
        let { body } = eventList[0];
        if (typeof body === 'string') body = JSON.parse(body);
        const pdfBody = utils.formatObjectToArray(body);
        const digitalApplicationForm = new Form(pdfBody);
        await digitalApplicationForm.generatePDF();
        const pdfPath = utils.getPDFLocation();
        await new PDFStream(pdfPath).upload();
        await new RimRaf(pdfPath).cleanUp();
        logger.log('PDF generated');
    } catch (err) {
        logger.error('Error in generating PDF', err);
    } finally {
        await logger.flushSentry();
    }
    return event;
};

module.exports = {
    handler,
};
