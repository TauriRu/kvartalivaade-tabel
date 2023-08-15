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

  // New task creation
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskStartDate, setNewTaskStartDate] = useState('');
  const [newTaskEndDate, setNewTaskEndDate] = useState('');
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
            <div className="task-name">{task.name.length > 15 ? task.name.substring(0, 15) + '...' : task.name}</div>
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
            min="2023-01-01"
            max="2023-12-31"
            onChange={(e) => setNewTaskStartDate(e.target.value)}
          />
          <input
            type="date"
            value={newTaskEndDate}
            min="2023-01-01"
            max="2023-12-31"
            onChange={(e) => setNewTaskEndDate(e.target.value)}
          />
          <button className="button" onClick={handleAddTask}>Add Task</button>
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
                          return (
                            <div className="task-container" key={task.name}>
                              <div className="task-name">{task.name.length > 15 ? task.name.substring(0, 15) + '...' : task.name}</div>
                              <div className="active">
                                <div className="task-name">{task.name}</div>
                                <div className="task-dates">
                                  {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
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
