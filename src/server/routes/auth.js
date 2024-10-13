const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { OAuth2Client } = require('google-auth-library');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Configuración de Passport para Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [profile.emails[0].value]);
      if (rows.length > 0) {
        return cb(null, rows[0]);
      } else {
        const [result] = await pool.query('INSERT INTO users (email, name) VALUES (?, ?)', [profile.emails[0].value, profile.name.givenName + ' ' + profile.name.familyName]);
        const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
        return cb(null, newUser[0]);
      }
    } catch (error) {
      return cb(error);
    }
  }
));

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, name]);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Crear usuario de prueba
router.post('/create-test-user', async (req, res) => {
  try {
    const testUser = {
      email: 'test@example.com',
      password: 'testpassword123',
      name: 'Test User',
      role: 'user'
    };
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const [result] = await pool.query('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)', [testUser.email, hashedPassword, testUser.name, testUser.role]);
    res.status(201).json({ message: 'Test user created successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating test user' });
  }
});

// ... (resto del código)

module.exports = router;