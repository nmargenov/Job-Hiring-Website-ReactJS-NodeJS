const multer = require('multer');
const path = require('path');
const { promisify } = require('util')
const { Storage } = require('@google-cloud/storage');
const multerGoogleStorage = require('multer-cloud-storage');
const fs = require('fs');
const tmp = require('tmp');

const projectId = process.env.PROJECT_ID;
const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY
const bucket = process.env.BUCKET;

const keyFileContent = {
    private_key: privateKey,
    client_email: clientEmail,
};

const tmpobj = tmp.fileSync();
const keyFilePath = tmpobj.name;

fs.writeFileSync(keyFilePath, JSON.stringify(keyFileContent));

const createMulterUpload = (storageConfig) => {
    const storage = new Storage({
        projectId: storageConfig.projectId,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
    });

    const bucket = storage.bucket(storageConfig.bucket);

    const storageEngine = multerGoogleStorage.storageEngine({
        bucket: bucket.name,
        projectId: storageConfig.projectId,
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY,
        },
        keyFilename: keyFilePath,
        acl: 'publicRead',
        filename: (req, file, cb) => {
            cb(null, storageConfig.directory + Date.now() + file.originalname);
        },
    });

    return multer({ storage: storageEngine });
};

const profileUpload = createMulterUpload({
    bucket: bucket,
    projectId: projectId,
    directory: 'profilePictures/',
}).single('profilePicture');


const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/profilePictures');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});


const profileUploadLocal = multer({ storage: profilePictureStorage, fileFilter: imageFilter }).single('profilePicture');

exports.getProfilePicture = async (req, res) => {
    const storage = process.env.STORAGE;
    if (storage === 'Local' || !storage) {
        const uploadPromise = promisify(profileUploadLocal);
        await uploadPromise(req, res);
        if (req.file) {
            return { image: req.file.path };
        }
        return null;
    } else if (storage === 'Cloud') {
        const uploadPromise = promisify(profileUpload);
        await uploadPromise(req, res);
        const publicUrl = `https://storage.googleapis.com/${bucket}/profilePictures/${req.file.filename}`;

        return { image: publicUrl }
    }
    return null;
};

exports.deleteImageFromCloud = async (objectPath) => {
    if(process.env.STORAGE !== 'Cloud'){
        return;
    }
    if(objectPath == "" || !objectPath){
        return; 
    }
    const storage = new Storage({
        projectId: projectId,
        keyFilename: keyFilePath,
    });

    const bucket = storage.bucket(process.env.BUCKET);

    const bucketName = "jobs-photos-bucket";
    const path = objectPath.replace(`https://storage.googleapis.com/${bucketName}/`, '');

    try {
        await bucket.file(path).delete();
    } catch (error) {
    }
};
