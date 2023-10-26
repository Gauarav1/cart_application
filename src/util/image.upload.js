const multer = require("multer");
const storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        const uniqueSuffix = new Date().getTime();
        const type = file.mimetype.split("/")[1];
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + type)
    }
})
const upload = multer({ storage: storage });
module.exports = upload;