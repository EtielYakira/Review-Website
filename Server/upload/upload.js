const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './../Client/public/uploads/',
  filename: function(req, file, cb){
    console.log(req,'EREERRRRREEEEQQQQQQQQQQQQQQQQQQQQQQ');
    console.log(file,'FILEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage
  
  // fileFilter: function(req, file, cb){
  //   checkFileType(file, cb);
  // }
})

// Check File Type
function checkFileType(file, cb){
  console.log(file);
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload
