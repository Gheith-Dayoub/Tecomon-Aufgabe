'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Widget from './Widget';
import CreateWidgetModal from './createWidgetModel';

const WidgetList = () => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateWidgetModal, setShowCreateWidgetModal] = useState(false);

  const fetchWidgets = async () => {
    try {
      const res = await axios.get('/api/widgets');
      setWidgets(res.data);
    } catch (err) {
      console.error('Error fetching widgets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-4">Loading widgets...</p>;

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Weather Widgets</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setShowCreateWidgetModal(true)}
          >
            Add a City
          </button>
        </div>

        {widgets.length === 0 ? (
          <p className="text-center text-gray-600 mt-6">No widgets found.</p>
        ) : (
          <ul className="space-y-4">
            {widgets.map((widget) => (
              <Widget key={widget._id} widget={widget} onDelete={fetchWidgets} />
            ))}
          </ul>
        )}
      </div>

      {showCreateWidgetModal && (
        <CreateWidgetModal
          onWidgetCreated={fetchWidgets}
          onHide={() => setShowCreateWidgetModal(false)}
        />
      )}
    </>
  );
};

export default WidgetList;
