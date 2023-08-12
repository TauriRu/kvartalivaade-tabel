import React, { useMemo } from 'react';
import './Calendar.css';

interface CalendarProps {
  currentQuarter: number;
}

const Calendar: React.FC<CalendarProps> = ({ currentQuarter }) => {
  // Funktsioon kuupäeva arvutamiseks vastavalt nädalale ja aastale
  const getWeekStartDate = (week: number, year: number) => {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7;
    const firstDay = new Date(januaryFirst.setDate(januaryFirst.getDate() + daysOffset));
    return firstDay;
  };

  // Funktsioon nädala numbri arvutamiseks vastavalt kuupäevale
  const getWeekNumber = (date: Date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);
    return weekNumber;
  };

  // Kuva kuupäevade nimekirja kvartali piires
  const quarterStartDate = new Date(new Date().getFullYear(), (currentQuarter - 1) * 3, 1);
  const quarterEndDate = new Date(new Date().getFullYear(), currentQuarter * 3, 0);
  const quarterDates: Date[] = [];
  for (let date = quarterStartDate; date <= quarterEndDate; date.setDate(date.getDate() + 1)) {
    quarterDates.push(new Date(date));
  }

  // Kuva tabeli päised (kuu nimed ja nädala numbrid)
  const tableHeaders = useMemo(() => {
    const headers = [];
    let currentMonth = quarterDates[0].getMonth();
    let currentWeek = getWeekNumber(quarterDates[0]);
    for (const date of quarterDates) {
      if (date.getMonth() !== currentMonth) {
        headers.push({ type: 'month', value: date.toLocaleDateString('en-US', { month: 'short' }) });
        currentMonth = date.getMonth();
      } else if (getWeekNumber(date) !== currentWeek) {
        headers.push({ type: 'week', value: String(currentWeek) });
        currentWeek = getWeekNumber(date);
      } else {
        headers.push({ type: 'day', value: '' });
      }
    }
    return headers;
  }, [quarterDates]);

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr>
            <th>Kuu</th>
            {tableHeaders.map((header, index) => (
              <th key={index}>
                {header.type === 'month' && header.value}
                {header.type === 'week' && `Nädal ${header.value}`}
              </th>
            ))}
          </tr>
        </thead>
        {/* Tööülesannete tabeli keha */}
      </table>
    </div>
  );
};

export default Calendar;
