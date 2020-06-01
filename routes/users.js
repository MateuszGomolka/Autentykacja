const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Ładowanie modelu

const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Strona z logowaniem

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Strona z rejestracją

router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Rejestracja

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Proszę wypełnić wszystkie pola.' });
  }

  if (password != password2) {
    errors.push({ msg: 'Hasła nie zgadzają się.' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Hasło musi zawierać przynajmniej 6 znaków.' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Podany e-mail już istnieje.' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Logowanie

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Wylogowanie

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Zostałeś pomyślnie wylogowany.');
  res.redirect('/users/login');
});

module.exports = router;
