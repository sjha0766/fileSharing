const router = require("express").Router();
let multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single(
  "myfile"
);

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (!req.file) {
      return res.json({ error: "All files are required!" });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      uuid: uuidv4(),
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
});

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  if (!uuid || !emailTo || !emailFrom) {
    return res.status(422).send({ error: "All filed are required" });
  }
  const file = await File.findOne({ uuid: uuid });

  if (file.sender) {
    return res.status(422).send({ error: "Email  already sent" });
  }
  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  const sendMail=require('../services/emailService');
  sendMail({
    from:emailFrom,
    to:emailTo,
    subject:'inShare file sharing',
    text:`${emailFrom} shared a file with you.`,
    html:require('../services/emailTemplate')({
      emailFrom:emailFrom,
      downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size:parseInt(file.size/1000)+ 'KB',
      expires:"24hr"
    })

  })
  res.send({success:true})
});

module.exports = router;
