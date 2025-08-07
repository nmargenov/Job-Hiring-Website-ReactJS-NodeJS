const express = require("express");
const cors = require("cors");
const { auth } = require('../middlewares/authMiddleware');
const path = require('path');


exports.expressConfig = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use('/api/src/profilePictures', express.static(path.join(__dirname, '../profilePictures')));
    app.use('/files', express.static('src/files'));
    app.use(auth);
}