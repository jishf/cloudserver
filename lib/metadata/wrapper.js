import bucketclient from 'bucketclient';
import inMemory from './in_memory/backend';

let client;

if (process.env.S3BACKEND && process.env.S3BACKEND === 'mem') {
    client = inMemory;
} else {
    client = new bucketclient.RESTClient();
}


const metadata = {
    createBucket: (bucketName, bucketMD, cb) => {
        client.createBucket(bucketName, bucketMD, err => {
            if (err instanceof Error) {
                return cb(err.message);
            }
            return cb(err);
        });
    },

    getBucket: (bucketName, cb) => {
        client.getBucketAttributes(bucketName, (err, data) => {
            if (err instanceof Error) {
                return cb(err.message);
            }
            return cb(err, data);
        });
    },

    deleteBucket: (bucketName, cb) => {
        client.deleteBucket(bucketName, err => {
            if (err instanceof Error) {
                return cb(err.message);
            }
            return cb(err);
        });
    },

    putObjectMD: (bucketName, objName, objVal, cb) => {
        client.putObject(bucketName, objName, objVal, err => {
            if (err instanceof Error) {
                return cb(err.message);
            }
            return cb(err);
        });
    },

    getObjectMD: (bucketName, objName, cb) => {
        client.getObject(bucketName, objName, (err, data) => {
            if (err instanceof Error) {
                return cb(err.message);
            }
            return cb(err, data);
        });
    },

    deleteObjectMD: (bucketName, objName, cb) => {
        client.deleteObject(bucketName, objName, err => {
            if (err instanceof Error) {
                return cb(err.message);
            }
            return cb(err);
        });
    },

    listObject: (bucketName, prefix, marker, delimiter, maxKeys, cb) => {
        client
        .listObject(bucketName, { prefix, marker, maxKeys, delimiter, },
                    (err, data) => {
                        if (err instanceof Error) {
                            return cb(err.message);
                        }
                        return cb(err, data);
                    });
    },

    switch: (newClient) => {
        client = newClient;
    },
};

export default metadata;