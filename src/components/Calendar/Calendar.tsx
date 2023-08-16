import React, { useState } from 'react';
import './Calendar.css';
import TaskCell from '../TaskCell/TaskCell';
import AddTask from '../AddTask/AddTask';

interface CalendarProps {
  currentQuarter: number;
}

interface TableDataItem {
  month: string;
  weeks: number[];
}

interface Task {
  name: string;
  startDate: Date;
  endDate: Date;
}

const Calendar: React.FC<CalendarProps> = ({ currentQuarter }) => {
  const getQuarterStartDate = (quarter: number): Date => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (quarter - 1) * 3;
    return new Date(year, month, 1);
  };

  const getISOWeek = (date: Date): number => {
    const januaryFirst = new Date(date.getFullYear(), 0, 1);
    const daysDiff = Math.floor((+date - +januaryFirst) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((daysDiff + januaryFirst.getDay() + 1) / 7);
    return weekNumber;
  };

  const startQuarterDate = getQuarterStartDate(currentQuarter);

  const monthData: TableDataItem[] = [];
  console.log(monthData)
  let currentMonth: string | null = null;

  for (let i = 0; i < 3; i++) {
    const currentDate = new Date(startQuarterDate);
    currentDate.setMonth(startQuarterDate.getMonth() + i);

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

  // New task creation
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: ' task 1',
      startDate: new Date(2023, 1, 23),
      endDate: new Date(2023, 1, 27),
    },
    {
      name: 'task 2',
      startDate: new Date(2023, 2, 21),
      endDate: new Date(2023, 3, 3),
    },
    {
      name: 'task 3',
      startDate: new Date(2023, 1, 30),
      endDate: new Date(2023, 3, 20),
    },
  ]);

  const handleAddTask = (name: string, startDate: string, endDate: string) => {
    const newTask: Task = {
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div className='calendarContainer'>
      <div className="task-section">
        <div className="task-header">Tasks</div>
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div className="task-name">{task.name.length > 15 ? task.name.substring(0, 15) + '...' : task.name}</div>
            <div className="task-dates">
              {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <div className="calendar">
        <tr className="add-task">
          <td colSpan={monthData.length * 4}>
            <AddTask onAddTask={handleAddTask} />
          </td>
        </tr>
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
              <tr className="task-row">
                {monthData.map((data, dataIndex) =>
                  data.weeks.map((week, weekIndex) => (
                    <TaskCell key={weekIndex} tasks={tasks} week={week} monthIndex={dataIndex} getISOWeek={getISOWeek} />
                  ))
                )}
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Calendar;
