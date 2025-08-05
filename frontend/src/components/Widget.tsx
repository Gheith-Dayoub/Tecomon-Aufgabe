'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface WidgetProps {
  widget: {
    _id: string;
    name: string;
    latlng: string;
  };
  onDelete: () => void;
}

function getWeatherDescription(code: number) {
  const descriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    80: 'Rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    // Extend as needed
  };
  return descriptions[code] || 'Unknown';
}

const Widget: React.FC<WidgetProps> = ({ widget, onDelete }) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      const [lat, lon] = widget.latlng.split('_');
      setLoading(true);
      setError('');

      try {
        const res = await axios.get(`/api/widgetDetails?lat=${lat}&lng=${lon}`);
        setWeather(res.data);
      } catch (err) {
        setError('Oops! Couldn’t load weather info. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const handleDelete = async () => {
    if (!confirm(`Delete widget for "${widget.name}"? This action cannot be undone.`)) return;

    setDeleting(true);
    try {
      await axios.delete(`/api/widgets/${widget._id}`);
      onDelete();
    } catch (err) {
      alert('Failed to delete widget. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-blue-100 rounded-2xl shadow-md p-6 w-full">
      {loading && <p className="text-gray-500">Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Weather Info - {widget.name}
            </h4>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-1 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 transition flex items-center gap-2"
            >
              {deleting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
            <div>🌡️ <span className="font-medium">Temperature:</span> {weather.temperature}°C</div>
            <div>💨 <span className="font-medium">Windspeed:</span> {weather.windspeed} km/h</div>
            <div>🌤️ <span className="font-medium">Condition:</span> {getWeatherDescription(weather.weathercode)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;
