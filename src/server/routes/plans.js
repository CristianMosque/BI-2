const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const [plans] = await pool.query('SELECT * FROM plans');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plans' });
  }
});

router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, price, features } = req.body;
    const [result] = await pool.query('INSERT INTO plans (name, price, features) VALUES (?, ?, ?)', [name, price, JSON.stringify(features)]);
    res.status(201).json({ message: 'Plan created successfully', planId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating plan' });
  }
});

router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;
    const startDate = new Date();
    const endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
    const [result] = await pool.query('INSERT INTO subscriptions (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)', [userId, planId, startDate, endDate]);
    res.status(201).json({ message: 'Subscription created successfully', subscriptionId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating subscription' });
  }
});

module.exports = router;