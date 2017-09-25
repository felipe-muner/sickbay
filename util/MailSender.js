require('dotenv').config()
const nodemailer = require('nodemailer')
const fs = require('fs')
const cheerio = require('cheerio')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

module.exports = {
  emailRecoverPassword: function(newPassword, userEmail, enrollment) {
    fs.readFile(process.env.PWD + '/views/email/basic-email.html', {encoding: 'utf-8'}, function(err, html) {
      if(err) {
        throw err
      } else {
        const $ = cheerio.load(html)
        let qs = '?m=' + enrollment + '&p=' + newPassword
        $("#redirectLink").attr('href', 'http://' + process.env.HOST + ':' + process.env.PORT + "/change-password" + qs)
        $('#title').text('British School - ' + __('systemName'))
        $('#textContent').text(__('messages.emailRecoverPass'))
        $('#btnRedirect').text(__('changePass'))
        let mailOptions = {}
        mailOptions.from = 'The British School - ' + __('systemName') + ' <noreply@britishschool.g12.br>'
        mailOptions.to = userEmail
        mailOptions.subject = __('recoverPass')
        mailOptions.text = __('recoverPass')
        mailOptions.html = $('html').html()

        transporter.sendMail(mailOptions, function(error, info) {
          error ? console.log(error) : console.log('Email sent: ' + info.response)
        })
      }
    })
  }
}
