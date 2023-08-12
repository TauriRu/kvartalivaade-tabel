import React from 'react';

interface CalendarProps {
  currentQuarter: number;
}

interface TableDataItem {
  month: string;
  week: number;
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

  const tableData: TableDataItem[] = [];
  const currentDate = new Date(startQuarterDate);
  let currentMonth = -1;

  while (currentDate.getMonth() >= startQuarterDate.getMonth() && currentDate.getMonth() < startQuarterDate.getMonth() + 3) {
    const week = getISOWeek(currentDate);
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    if (currentDate.getMonth() !== currentMonth) {
      tableData.push({ month: monthName, week: week });
      currentMonth = currentDate.getMonth();
    } else {
      if (week !== tableData[tableData.length - 1].week) {
        tableData.push({ month: '', week: week });
      }
    }

    currentDate.setDate(currentDate.getDate() + 7);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Kuu</th>
          <th>Nädal</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => (
          <tr key={index}>
            <td>{data.month}</td>
            <td>{data.week}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
