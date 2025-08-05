const multer = require('multer');
const path = require('path');
const { promisify } = require('util')

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

const profileUpload = multer({ storage: profilePictureStorage, fileFilter:imageFilter }).single('profilePicture');

exports.getProfilePicture = async (req, res) => {
    const uploadPromise = promisify(profileUpload);
    await uploadPromise(req, res);

    if (req.file) {
        return { image: req.file.path };
    }
    return null;

};