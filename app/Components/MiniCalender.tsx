"use client"
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  recurringDates: Date[]; // Array of date strings
  startDate: Date; // Initial start date in ISO format
}

const HighlightedCalendar: React.FC<CalendarProps> = ({ recurringDates, startDate }) => {
  // Parse the props
  console.log(recurringDates)
  const parsedDates = recurringDates.map((date) => new Date(date));
  const parsedStartDate = new Date(startDate);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Highlighted Calendar</h2>
      
      <DatePicker
        inline
        selected={parsedStartDate}
        highlightDates={parsedDates}
        className="bg-blue-500 text-white rounded-full"    
      />
    </div>
  );
};

export default HighlightedCalendar;
