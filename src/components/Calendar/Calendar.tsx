import React from 'react';
import './Calendar.css';

interface CalendarProps {
  currentQuarter: number;
}

interface TableDataItem {
  month: string;
  weeks: number[];
}

const Calendar: React.FC<CalendarProps> = ({ currentQuarter }) => {
  const getQuarterStartDate = (quarter: number): Date => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (quarter - 1) * 3 + 1;
    return new Date(year, month - 1, 1);
  };

  const getISOWeek = (date: Date): number => {
    const januaryFirst = new Date(date.getFullYear(), 0, 1);
    const daysDiff = Math.floor((+date - +januaryFirst) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((daysDiff + januaryFirst.getDay() + 1) / 7);
    return weekNumber;
  };

  const startQuarterDate = getQuarterStartDate(currentQuarter);

  const monthData: TableDataItem[] = [];
  let currentMonth: string | null = null;

  for (let i = 0; i < 3; i++) { // Loop through 3 months in the quarter
    const currentDate = new Date(startQuarterDate);
    currentDate.setMonth(currentDate.getMonth() + i);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    if (currentMonth !== monthName) {
      monthData.push({ month: monthName, weeks: [] });
      currentMonth = monthName;
    }

    const startWeek = getISOWeek(currentDate);
    for (let j = startWeek; j < startWeek + 4; j++) {
      monthData[monthData.length - 1].weeks.push(j);
    }
  }

  return (
    <div className="calendar">
      <div className="calendar-body">
        <table>
          <thead>
            <tr className="month-row">
              {monthData.map((data, index) => (
                <th key={index} className="month-cell" colSpan={4}>
                  {data.month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="week-row">
              {monthData.map((data) =>
                data.weeks.map((week, index) => (
                  <td key={index} className="week-cell">
                    {week}
                  </td>
                ))
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
