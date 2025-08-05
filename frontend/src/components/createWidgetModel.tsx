 'use client';

import { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

interface Props {
  onHide: () => void;
  onWidgetCreated: () => void;
}

const CreateWidgetModal: React.FC<Props> = ({ onHide, onWidgetCreated }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setError('');
    setSuccessMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!city.trim()) {
      setError('Oops! City name is required. Please type one.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );

      const result = response.data?.results?.[0];

      if (result && result.latitude && result.longitude) {
        const latlng = `${result.latitude}_${result.longitude}`;
        await axios.post('/api/widgets', { latlng, name: result.name });
        setSuccessMessage(`✅ Widget created for: ${result.name}`);
        onWidgetCreated();
        setCity('');
        // Delay hide for user to see message
        setTimeout(() => {
          onHide();
        }, 1000);
      } else {
        setError('We couldn’t find this city. Please check the spelling or try another one.');
      }
    } catch (err) {
      setError('Something went wrong while connecting. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800">Add Weather Widget</h3>
          <button onClick={onHide} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 text-sm">
          Search by city name to create a weather widget.
        </p>

        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a city (e.g., Paris, Tokyo)"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onHide}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Checking...
              </>
            ) : (
              'Create'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWidgetModal;
