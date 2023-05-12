import React, { useState } from "react";
import axios from "axios";

function CreateEventForm() {
  const [eventName, setEventName] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const Link = `http://${process.env.REACT_APP_API_URL}/api/events/createEvent`
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(Link, {
        eventName,
        eventTime,
        eventLocation,
      });

      setIsLoading(false);
      alert("Event created successfully!");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Event Time:
          <input
            type="time"
            value={eventTime}
            onChange={(event) => setEventTime(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Event Location:
          <input
            type="text"
            value={eventLocation}
            onChange={(event) => setEventLocation(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEventForm;
