const Widget = require('../models/Weather');
const axios = require('axios');

const weatherCache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 mins

// Get all saved widgets
exports.getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find();
    res.json(widgets);
  } catch (err) {
    console.log('Error in getWidgets:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get weather details by coordinates with caching
exports.getWidgetDetails = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat or lng parameters' });
  }

  const key = `${lat},${lng}`;
  const now = Date.now();

  //cached data option
  if (weatherCache[key] && now - weatherCache[key].timestamp < CACHE_TTL) {
    console.log('Using cached weather data');
    return res.json(weatherCache[key].data);
  }

  try {
    const { data } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );

    const currentWeather = data.current_weather;

    // Cache response
    weatherCache[key] = {
      data: currentWeather,
      timestamp: now,
    };

    console.log('Fetched live weather data');
    res.json(currentWeather);
  } catch (err) {
    console.error('Error in getWidgetDetails:', err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

// Create a new widget
exports.createWidget = async (req, res) => {
  try {
    const newWidget = new Widget(req.body);
    const savedWidget = await newWidget.save();
    res.status(201).json(savedWidget);
  } catch (err) {
    console.error('Error in createWidget:', err);
    res.status(400).json({ error: 'Invalid widget data' });
  }
};

// Delete a widget by ID
exports.deleteWidget = async (req, res) => {
  try {
    const deletedWidget = await Widget.findByIdAndDelete(req.params.id);
    if (!deletedWidget) return res.status(404).json({ error: 'Widget not found' });
    res.json({ message: 'Widget deleted successfully' });
  } catch (err) {
    console.error('Error in deleteWidget:', err);
    res.status(400).json({ error: 'Invalid widget ID' });
  }
};
