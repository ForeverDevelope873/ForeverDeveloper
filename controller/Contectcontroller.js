const Contect = require('../models/Contect')
const nodemailer = require('nodemailer')
require('dotenv').config()

// Create Contact and Send Email
exports.create = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Save to MongoDB
    const newContect = new Contect({ name, email, phone, subject, message })
    await newContect.save()

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const mailOptions = {
      from: newContect.email,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${newContect.name}`,
      text: `You have received a new contact submission:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      `
    }
    await transporter.sendMail(mailOptions)
    res
      .status(200)
      .json({ message: 'Contact saved and email sent successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
