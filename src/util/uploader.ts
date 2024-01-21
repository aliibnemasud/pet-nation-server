import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "upload_images/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix  + '-' + file.originalname)
  }
})

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg/;

    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File must be Png or Jpg image."));
    }
  },
  limits: {
    fileSize: 5000000
  }
});


export default uploader;