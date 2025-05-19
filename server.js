require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
app.use(express.json());
app.use(cors());

// 📧 Setup for Yahoo Mail
const transporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: process.env.YAHOO_EMAIL,
    pass: process.env.YAHOO_APP_PASSWORD,
  },
});

// ☁️ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Folder in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// 📩 Email Endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.YAHOO_EMAIL,
      to: process.env.YAHOO_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

// 📤 Cloudinary Image Upload Endpoint
app.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Image upload failed' });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
