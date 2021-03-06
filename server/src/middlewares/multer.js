const multer = require('multer');
const path = require('path');

const {
  productImageSavingLocation,
  websiteImageSavingLocation,
} = require('../../config/config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'pro_images') {
      cb(null, productImageSavingLocation);
    } else {
      cb(null, websiteImageSavingLocation);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.originalname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
});

module.exports = upload;
