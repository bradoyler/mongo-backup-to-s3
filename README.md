# Mongo Backup to S3
Easily stream mongodb backups to S3

[![NPM Version][npm-image]][npm-url]

## Motivation
Explore an inexpensive way to backup your MongoDb databases

## Get Started
Setup an S3 bucket, run this in a cron job using a Heroku Single Dyno (worker)

### Install
```sh
npm install mongo-backup-to-s3
```

Example:
```
var mongoBackup = require('mongo-backup-to-s3');

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

mongoBackup.dumpToS3(config);
```

Generated filename in S3: `backups/mongo_2015-12-30_22-16-34_mydatabase.dmp`

## Dependent modules
This module relies heavily on [mongo-dump-stream](https://github.com/punkave/mongo-dump-stream) so it can output the 'dump' to a stream, and so we don't have to use `mongodump` (which requires a child process).

[npm-image]: https://img.shields.io/npm/v/mongo-backup-to-s3.svg
[npm-url]: https://npmjs.org/package/mongo-backup-to-s3

