import React from 'react';
import { ChevronRight, Circle, CheckCircle2, Clock as ClockIcon } from 'lucide-react';
import { format } from 'date-fns';

const TaskListItem = ({ task, index, onClick }) => {
  const statusIcons = {
    TO_DO: <Circle className="h-5 w-5 text-red-500" />,
    IN_PROGRESS: <ClockIcon className="h-5 w-5 text-yellow-500" />,
    DONE: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  };

  const statusColors = {
    TO_DO: 'hover:bg-red-100',
    IN_PROGRESS: 'hover:bg-yellow-100',
    DONE: 'hover:bg-green-100',
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between p-4 m-4 cursor-pointer transition-all duration-200
        ${statusColors[task.status]} hover:shadow-sm group rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none
      `}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Index Number */}
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-semibold text-gray-600 group-hover:bg-gray-200 transition-colors">
          {index + 1}
        </div>

        {/* Status Icon */}
        <div className="flex-shrink-0">
          {statusIcons[task.status]}
        </div>

        {/* Task Title */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-gray-900 truncate group-hover:text-gray-700">
            {task.title}
          </h4>
          {task.createdAt && (
            <p className="text-xs text-gray-500 mt-0.5">
              Created on {format(new Date(task.createdAt), 'MMM dd, yyyy')}
            </p>
          )}
        </div>
      </div>

      {/* Arrow Icon */}
      <div className="flex-shrink-0 ml-4">
        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

export default TaskListItem;