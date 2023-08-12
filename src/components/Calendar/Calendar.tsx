import React, { useState } from 'react';
import './Calendar.css';

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

  for (let i = 0; i < 3; i++) {
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

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStartDate, setNewTaskStartDate] = useState('');
  const [newTaskEndDate, setNewTaskEndDate] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: 'Task 1',
      startDate: new Date(2023, 7, 15),
      endDate: new Date(2023, 7, 20),
    },
    {
      name: 'Task 2',
      startDate: new Date(2023, 7, 25),
      endDate: new Date(2023, 7, 30),
    },
    // Add more tasks here
  ]);

  const handleAddTask = () => {
    if (newTaskName && newTaskStartDate && newTaskEndDate) {
      const newTask: Task = {
        name: newTaskName,
        startDate: new Date(newTaskStartDate),
        endDate: new Date(newTaskEndDate),
      };

      setTasks([...tasks, newTask]);

      setNewTaskName('');
      setNewTaskStartDate('');
      setNewTaskEndDate('');
    }
  };

  return (
    <div className='calendarContainer'>
      <div className="task-section">
        <div className="task-header">Tasks</div>
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div className="task-name">{task.name}</div>
            <div className="task-dates">
              {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <div className="calendar">
        <div className="add-task">
          <input
            type="text"
            placeholder="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <input
            type="date"
            value={newTaskStartDate}
            onChange={(e) => setNewTaskStartDate(e.target.value)}
          />
          <input
            type="date"
            value={newTaskEndDate}
            onChange={(e) => setNewTaskEndDate(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
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
                {monthData.map((data) =>
                  data.weeks.map((week, index) => (
                    <td key={index} className="task-cell">
                      {tasks.map((task) => {
                        const startWeek = getISOWeek(task.startDate);
                        const endWeek = getISOWeek(task.endDate);
                        if (week >= startWeek && week <= endWeek) {
                          return <div className="task">{task.name}</div>;
                        }
                      })}
                    </td>
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
