import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function EventList() {
  const [events, setEvents] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const link = "http://localhost:8080/api/events/list"
  useEffect(() => {
    axios.get(link)
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDisplayCountChange = (count) => {
    setDisplayCount(count);
  };

  return (
    <div>
      <h1>List of Events</h1>
      {events.length === 0 ? (
        <p>There are no events to show.</p>
      ) : (
        <div>
          <div style={{ marginBottom: '10px' }}>
            Displaying {displayCount} out of {events.length} events
          </div>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '5px' }}>Event Name</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Time</th>
                <th style={{ border: '1px solid black', padding: '5px' }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {events.length>0 && (events.slice(0, displayCount).map(event => (
                <tr key={event._id}>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{event.eventName}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{event.eventTime}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{`${event.eventLocationLatitude}, ${event.eventLocationLongitude}`}</td>
                </tr>
              )))}
            </tbody>
          </table>
          <div style={{ marginTop: '10px' }}>
            <Button variant="contained" onClick={() => handleDisplayCountChange(10)}>Show 10 events</Button>
            <Button variant="contained" onClick={() => handleDisplayCountChange(20)}>Show 20 events</Button>
            <Button variant="contained" onClick={() => handleDisplayCountChange(50)}>Show 50 events</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventList;
