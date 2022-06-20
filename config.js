class ConfigProps {
    static configStore() {
        return {
            production: {
                sentryDsn: '',
                aws: {
                    s3Bucket: 'pdf-store-demo',
                },
            },
            development: {
                sentryDsn: '',
                aws: {
                    s3Bucket: 'pdf-store-demo',
                },
            },
            test: {
                sentryDsn: '',
                aws: {
                    s3Bucket: 'pdf-store-demo',
                },
            },
        };
    }

    static getConfig() {
        return ConfigProps.configStore()[process.env.NODE_ENV] ?? ConfigProps.configStore().development;
    }
}

module.exports = {
    configProps: ConfigProps,
};
