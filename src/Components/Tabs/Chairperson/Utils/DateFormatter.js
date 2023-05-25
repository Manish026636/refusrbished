import React from 'react';

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata' // Set to UTC to remove timezone offset
  };
  return date.toLocaleString('en-US', options);
}

function DateFormatter({ dateString }) {
  const formattedDate = formatDate(dateString);
  return <span>{formattedDate}</span>;
}

export default DateFormatter;
