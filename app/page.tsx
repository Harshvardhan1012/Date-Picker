"use client"
import React, { useEffect, useState } from "react";
import { format, addDays, addMinutes, set } from "date-fns";
import PreviewCalendar from "./Components/MiniCalender"; // Import the reusable component
import { RRule, Weekday, Frequency } from "rrule";
import { calculateRecurringDates, daysOfWeek, FrequencySelect, months, weekDayMap } from "./constants/constants";
import { DaySelector } from "./Components/DaySelector";
import { EndOption } from "./types/type";
import { InputField } from "./Components/InputField";



const WeeklyRecurrence = () => {
  const [select,setSelect]=useState<number>(Frequency.WEEKLY);
  const [interval, setInterval] = useState(1); // Default interval of 1 week
  const [startDate, setStartDate] = useState(new Date());
  const [endOption, setEndOption] = useState<EndOption>("afterOccurrences"); //"afterOccurrences", "onDate"
  const [occurrences, setOccurrences] = useState(20); // Default occurrences
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([RRule.MO, RRule.FR, RRule.SU, RRule.TU, RRule.WE, RRule.TH, RRule.SA]); // All days are selected by default
  const [recurringDates,setRecurringDates] = useState(calculateRecurringDates({
    freq: select,
    interval,
    startDate,
    byweekday: selectedDays,
    endOption,
    occurrences,
    endDate,
  }))
  const [byMonthDay, setByMonthDay] = useState<number[]>(Array.from({ length: 12 }, (_, i) => i + 1));
  const [monthlyDays, setMonthlyDays] = useState<number[]>(Array.from({ length: 31 }, (_, i) => i + 1));


  const toggleDaySelection = (day: string) => {
    const weekDay = weekDayMap[day as keyof typeof weekDayMap];
    setSelectedDays((prev) =>
      prev.includes(weekDay) ? prev.filter((d) => d !== weekDay) : [...prev, weekDay]
    );
  };

 

const toggleMonthSelection=(day:number)=>{
  setMonthlyDays((prev)=>prev.includes(day)?prev.filter((d)=>d!==day):[...prev,day])
}

const toggleMonthSelect = (monthIndex: number) => {
  setByMonthDay((prev) =>
    prev.includes(monthIndex) ? prev.filter((month) => month !== monthIndex) : [...prev, monthIndex]
  );
};
  

useEffect(()=>{
  setRecurringDates(calculateRecurringDates({
    freq: select,
    interval,
    startDate,
    byweekday: selectedDays,
    endOption,
    occurrences,
    endDate,
    bymonthday:monthlyDays,
    bymonth:byMonthDay
  }))
},[select,interval,startDate,selectedDays,endOption,occurrences,endDate,monthlyDays,byMonthDay])

  return (
    <div className="p-9 mx-48 bg-gray-100 rounded-lg shadow-md">
      <form>
        <label className="mt-4">Recurring Pattern</label>
      <select value={select} onChange={(e)=>setSelect(Number(e.target.value))} className="border border-gray-300 rounded-md p-2 w-full mb-4">
        <option value={Frequency.WEEKLY}>Weekly</option>
        <option value={Frequency.MONTHLY}>Monthly</option>
        <option value={Frequency.YEARLY}>Yearly</option>
        <option value={Frequency.DAILY}>Daily</option>
      </select>
      <h2 className="text-lg font-semibold mb-4">{FrequencySelect[select as keyof typeof FrequencySelect]} Recurrence</h2>

      {/* Interval Input */}
      <div className="mb-4">
       <InputField
        label="Repeat every"
        value={interval}
        onChange={(value)=>setInterval(Number(value))}
        type="number"
        min={1}
        />
        {
         FrequencySelect[select as keyof typeof FrequencySelect].toLowerCase().slice(0,-2)+"s"  
        }
      </div>

      {/* Start Date Picker */}
      <div className="mb-4">
        <InputField
        label="Start Date"
        value={format(startDate,"yyyy-MM-dd")}
        onChange={(value)=>setStartDate(new Date(value))}
        type="date"
        />
      </div>

      {/* Specific Days of the Week */}
      {select === Frequency.WEEKLY && (
        <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Days of the Week</label>
        <div className="space-y-1 flex flex-row gap-4">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDays.includes(weekDayMap[day as keyof typeof weekDayMap])}
                onChange={() => toggleDaySelection(day)}
                className="mr-2"
              />
              {day}
            </label>
          ))}
        </div>
      </div>
      )}
 {
  select === Frequency.MONTHLY && (
    <DaySelector
          selectedDays={monthlyDays}
          onToggleDay={toggleMonthSelection}
          label="Select Dates of the Month"
        />
  )
}
{
  select===Frequency.YEARLY && (
    <div className="space-y-8 p-4">
      {/* Yearly Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Months</label>
        <div className="grid grid-cols-4 gap-2 bg-white p-4 rounded-lg shadow-md">
          {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
            <div
              key={month}
              onClick={() => toggleMonthSelect(month)}
              className={`flex items-center justify-center border rounded-lg p-2 cursor-pointer ${
                byMonthDay.includes(month) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {months[month as keyof typeof months]}
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Days Select */}
      {byMonthDay.length > 0 && (
       <DaySelector
       selectedDays={monthlyDays}
       onToggleDay={toggleMonthSelection}
       label="Select Dates of the Month"
     />
      )}
    </div>
  )
}


      {/* End Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">End Recurrence</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="endOption"
              value="afterOccurrences"
              checked={endOption === "afterOccurrences"}
              onChange={(e) => setEndOption(e.target.value as EndOption)}
              className="mr-2"
            />
            Ends After
            <input
              type="text"
              min="1"
              value={occurrences}
              onChange={(e) => setOccurrences(Number(e.target.value))}
              disabled={endOption !== "afterOccurrences"}
              className={`border border-gray-300 rounded-md p-2 w-20 ml-2 ${
                endOption !== "afterOccurrences" && "bg-gray-100 cursor-not-allowed"
              }`}
            />
            occurrences
          </label>

          {/* End On Specific Date */}
          <label className="flex items-center">
            <input
              type="radio"
              name="endOption"
              value="onDate"
              checked={endOption === "onDate"}
              onChange={(e) => setEndOption(e.target.value as EndOption)}
              className="mr-2"
            />
            Ends On
            <input
              type="date"
              value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              disabled={endOption !== "onDate"}
              className={`border border-gray-300 rounded-md p-2 ml-2 ${
                endOption !== "onDate" && "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </label>
        </div>

      {/* Calendar Preview */}
      <div className="mb-4 flex justify-center items-center flex-col">
        <h3 className="text-sm font-medium mb-2">Preview:</h3>
        <PreviewCalendar recurringDates={recurringDates} startDate={startDate}/>
      </div>
    </div>
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply Recurrence</button>
    </form>
  </div>
  );
};

export default WeeklyRecurrence;
