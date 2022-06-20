const util = require('util');
const path = require('path');
const Sentry = require('@sentry/node');
const { getConfig } = require('../config').configProps;
const { sentryDsn } = getConfig();

Sentry.init({
    dsn: sentryDsn,
    environment: process.env['NODE_ENV'],
    maxValueLength: 2000,
});

class Logger {
    log(...args) {
        console.log(...args);
    }
    info(...args) {
        console.info(...args);
    }
    warn(...args) {
        console.warn(...args);
    }
    debug(...args) {
        console.debug(...args);
    }
    error(...args) {
        console.error(args);
        let { message, stackInfo } = this.getBaseMessage(args);
        if (stackInfo) {
            message = `${message}, stack: ${stackInfo.stack}`;
        }
        console.log(message);
        Sentry.captureException(new Error(message));
    }
    async flushSentry() {
        console.log('Starting Sentry flush');
        const flushValue = await Sentry.flush(2000);
        console.log('Sentry flush completed', flushValue);
    }

    getBaseMessage(args) {
        let message = '';
        for (let arg of args) {
            if (typeof arg == 'string') {
                message = `${message} ${arg}`;
            } else {
                message = `${message} ${util.inspect(arg, {
                    breakLength: Infinity,
                    maxArrayLength: 20,
                })}`;
            }
        }
        message = message.trimStart();
        const stackInfo = this.getStackInfo(1);
        message = `${message} (in ${stackInfo.file}:${stackInfo.line})`;
        return { message, stackInfo };
    }

    getStackInfo(stackIndex) {
        const stacklist = new Error().stack.split('\n').slice(3);
        // stack trace format:
        // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
        const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
        const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

        const s = stacklist[stackIndex] || stacklist[0];
        const sp = stackReg.exec(s) || stackReg2.exec(s);

        if (sp && sp.length === 5) {
            return {
                method: sp[1],
                relativePath: path.relative(process.env['APP_HOME'], sp[2]),
                line: sp[3],
                pos: sp[4],
                file: path.basename(sp[2]),
                stack: stacklist.join('\n'),
            };
        }
    }
}

module.exports = {
    logger: new Logger(),
};
