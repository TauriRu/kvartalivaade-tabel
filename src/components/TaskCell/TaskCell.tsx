import React from 'react';

interface Task {
    name: string;
    startDate: Date;
    endDate: Date;
}

interface TaskCellProps {
    tasks: Task[];
    week: number;
    monthIndex: number;
    getISOWeek: (date: Date) => number;
}

const TaskCell: React.FC<TaskCellProps> = ({ tasks, week, monthIndex, getISOWeek }) => {
    return (
        <td className="task-cell">
            {tasks.map((task) => {
                const startWeek = getISOWeek(task.startDate);
                const endWeek = getISOWeek(task.endDate);

                if (week >= startWeek && week <= endWeek && monthIndex === task.startDate.getMonth() % 3) {
                    return (
                        <div className="task-container" key={task.name}>
                            <div className="task-name">
                                {task.name.length > 15 ? task.name.substring(0, 15) + '...' : task.name}
                            </div>
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
    );
};

export default TaskCell;
