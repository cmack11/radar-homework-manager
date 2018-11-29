var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.getUserByEmail(req.body.email, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        //user.resetPasswordToken = token;
        //user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        expire = Date.now() + 3600000;

        User.saveReset(user.user_id,user.email,token,expire);
        done();
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: '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'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@radarhomework.com',
        subject: 'RadarHomework Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/Repass/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

router.get('/reset/:token', function(req, res) {
  User.getReset(req.params.token, function(err, reset) {
    if (!reset || Date.compare(reset.reset_expire, Date.now) > -1) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/');
    }
    res.render('reset', {
      user: req.user
    });
  });
});
