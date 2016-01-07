var mds = require('mongo-dump-stream'),
    AWS = require('aws-sdk'),
    moment = require('moment'),
    MemoryStream = require('memorystream');

function isValidConfig(config) {
    return (config.mongodb && config.s3 && config.mongodb.url && config.s3.key && config.s3.secret);
}

function dumpToS3(config, callback) {

    var isValid = isValidConfig(config);
    if (!isValid) {
        return console.error('## Aborted dump. Config object invalid');
    }

    var stream = new MemoryStream();
    var urlTokens = config.mongodb.url.split('/');
    var dbName = urlTokens[urlTokens.length - 1];
    var s3 = new AWS.S3({accessKeyId: config.s3.key, secretAccessKey: config.s3.secret});
    var tsFormat = config.s3.timestampFormat || 'YYYY-MM-DD_HH:mm:ss';
    var backupTS = moment().format(tsFormat);
    var filename = 'mongo_' + backupTS + '.dmp';

    if (config.s3.folder) {
        filename = config.s3.folder + '/mongo_' + backupTS + '_' + dbName + '.dmp';
    }

    var params = {Bucket: config.s3.bucket, Key: filename, Body: stream};
    var partSizeMB = config.s3.partSizeMB || 5;
    var queueSize = config.s3.queueSize || 1;
    var options = {partSize: partSizeMB * 1024 * 1024, queueSize: queueSize};

    s3.upload(params, options, function (err, data) {

        if(typeof callback=== 'function') {
            callback(err, data);
        }
        else {
            console.log('### s3.upload complete:', err, data);
        }

    }).on('httpUploadProgress', function (evt) {

        console.log('### s3.httpUploadProgress:', evt.loaded, '/', evt.total);
    });

    mds.dump(config.mongodb.url, stream, function (err) {
        if (err) {
            console.error('### mds.dump error:', err);
        }
        stream.end();
    });
}

module.exports.dumpToS3 = dumpToS3;
