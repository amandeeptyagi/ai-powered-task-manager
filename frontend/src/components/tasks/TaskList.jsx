import React, { useState, useEffect } from 'react';
import TaskListItem from './TaskListItem';
import TaskDetailModal from './TaskDetailModal';
import { getTaskById } from '@/services/taskApi';
import { toast } from 'react-hot-toast';

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  editingTask,
  onUpdate,
  onCancelEdit,
  deleting = false,
  updating = false
}) => {
  const [activeTab, setActiveTab] = useState('TO_DO');
  const [selectedTask, setSelectedTask] = useState(null);
  const [loadingTask, setLoadingTask] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTask]);

  const handleTaskClick = async (taskId) => {
    setLoadingTask(true);
    try {
      const response = await getTaskById(taskId);
      setSelectedTask(response.data);
    } catch (error) {
      toast.error('Failed to fetch task details');
    } finally {
      setLoadingTask(false);
    }
  };

  const tasksByStatus = {
    TO_DO: tasks.filter((t) => t.status === 'TO_DO'),
    IN_PROGRESS: tasks.filter((t) => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter((t) => t.status === 'DONE'),
  };

  const tabs = [
    { key: 'TO_DO', label: 'To Do', count: tasksByStatus.TO_DO.length, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-500' },
    { key: 'IN_PROGRESS', label: 'In Progress', count: tasksByStatus.IN_PROGRESS.length, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500' },
    { key: 'DONE', label: 'Done', count: tasksByStatus.DONE.length, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-500' },
  ];

  const currentTasks = tasksByStatus[activeTab];

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex justify-around gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex flex-col items-center gap-2 px-6 py-3 rounded-lg font-semibold 
              ${activeTab === tab.key
                ? `${tab.bgColor} ${tab.color} border-b-4 border-r-4 rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none ${tab.borderColor} shadow-md cursor-pointer`
                : 'bg-white text-lime-700 hover:bg-lime-700 hover:text-white border-2 border-lime-700 rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none cursor-pointer hover:shadow-md'
              }
            `}
          >
            <span>{tab.label}</span>
            <span className={`
              px-2.5 py-0.5 rounded-full text-xs font-bold
              ${activeTab === tab.key
                ? 'bg-white ' + tab.color
                : 'bg-gray-100 text-lime-700'
              }
            `}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none shadow-md overflow-hidden">
        {currentTasks.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-3">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No tasks in {tabs.find(t => t.key === activeTab)?.label}</h3>
            <p className="text-sm text-gray-500">Tasks will appear here once you create them</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {currentTasks.map((task, index) => (
              <TaskListItem
                key={task.id}
                task={task}
                index={index}
                onClick={() => handleTaskClick(task.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {loadingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {selectedTask && !loadingTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={(task) => { setSelectedTask(null); onEdit(task); }}
          onDelete={(id) => { setSelectedTask(null); onDelete(id); }}
          onUpdate={onUpdate}
          deleting={deleting}
          updating={updating}
        />
      )}
    </div>
  );
};

export default TaskList;
