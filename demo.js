var dumpStream = require('./index');

var config = {
    mongodb:{
        url: process.env.MONGO_URL
    },
    s3:{
        bucket:'newsblock',
        folder:'backups',
        key: process.env.AWS_ACCESS_KEY,
        secret: process.env.AWS_SECRET_KEY
    }
};

dumpStream.dumpToS3(config);

// optional callback interface
//dumpStream.dumpToS3(config, function (err, data) {
//    console.log('### dumpToS3 complete:', err, data);
//});
