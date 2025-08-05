const express = require('express');
// const axios = require('axios');
const Search = require('../models/Weather');
const router = express.Router();

const weatherController = require('../controllers/weatherController');

router.get('/widgets', weatherController.getWidgets);
router.get('/widgetDetails', weatherController.getWidgetDetails);
router.post('/widgets', weatherController.createWidget);
router.delete('/widgets/:id', weatherController.deleteWidget);

module.exports = router;
