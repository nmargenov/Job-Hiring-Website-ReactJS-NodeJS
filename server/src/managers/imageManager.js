const multer = require('multer');
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

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};
const cvFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
};

const createMulterUpload = (storageConfig, filter, limit) => {
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
            const decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');
            cb(null, storageConfig.directory + Date.now() + decodedName);
        }
    });

    return multer({ storage: storageEngine, fileFilter: filter, limits: limit });
};

const profileUpload = createMulterUpload({
    bucket: bucket,
    projectId: projectId,
    directory: 'profilePictures/',
}, imageFilter).single('profilePicture');


const pdfUpload = createMulterUpload({
    bucket: bucket,
    projectId: projectId,
    directory: 'files/'
}, cvFilter, { fileSize: 10 * 1024 * 1024 }).single('file')


const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/profilePictures');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const pdfStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'src/files');
    },
    filename: (req, file, cb) => {
        const decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, Date.now() + decodedName);
    }
});

const profileUploadLocal = multer({ storage: profilePictureStorage, fileFilter: imageFilter }).single('profilePicture');
const pdfUploadLocal = multer({ storage: pdfStorage, fileFilter: cvFilter, limits: { fileSize: 10 * 1024 * 1024 } }).single('file');

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

exports.getFile = async (req, res) => {
    const storage = process.env.STORAGE;
    if (storage === 'Local' || !storage) {
        const uploadPromise = promisify(pdfUploadLocal);
        await uploadPromise(req, res);
        const decodedName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
        const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;
        if (req.file) {
            return { filePath: fileUrl, fileName: decodedName, type: req.file.mimetype };
        }
        return null;
    } else if (storage === 'Cloud') {
        const uploadPromise = promisify(pdfUpload);
        await uploadPromise(req, res);
        const publicUrl = `https://storage.googleapis.com/${bucket}/files/${req.file.filename}`;
        const decodedName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
        
        return { filePath: publicUrl, fileName: decodedName, type: req.file.mimetype }
    }
    return null;
}

exports.deleteImageFromCloud = async (objectPath) => {
    try {
        if (process.env.STORAGE !== 'Cloud') {
            return;
        }
        if (objectPath == "" || !objectPath) {
            return;
        }
        const storage = new Storage({
            projectId: projectId,
            keyFilename: keyFilePath,
        });

        const bucket = storage.bucket(process.env.BUCKET);

        const bucketName = "jobs-photos-bucket";
        const path = objectPath.replace(`https://storage.googleapis.com/${bucketName}/`, '');

        await bucket.file(path).delete();
    } catch (error) {
    }
};
