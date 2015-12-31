var dumpStream = require('./index');

var config = {
    mongodb:{
        url: process.env.MONGO_URL
    },
    s3:{
        bucket:'mybucket',
        folder:'backups',
        key: process.env.AWS_ACCESS_KEY,
        secret: process.env.AWS_SECRET_KEY
    }
};

dumpStream.dumpToS3(config);
