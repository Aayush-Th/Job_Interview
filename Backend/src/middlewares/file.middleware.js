const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(), // Store the file in memory as a buffer
    limits: {   
        fileSize: 3 * 1024 * 1024, // Limit file size to 3MB
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "application/pdf") {
            callback(null, true)
        } else {
            callback(new Error("Only PDF resumes are supported."))
        }
    }
});

module.exports = upload;