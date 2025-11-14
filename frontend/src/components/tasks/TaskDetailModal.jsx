import React, { useState } from 'react';
import { X, Edit2, Trash2, Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import TaskForm from './TaskForm';
import ConfirmDialog from "../ui/ConfirmDialog";
import { toast } from "react-hot-toast";

const TaskDetailModal = ({ task, onClose, onEdit, onDelete, onUpdate, deleting = false, updating = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const statusConfig = {
    TO_DO: { label: 'To Do', color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-200' },
    IN_PROGRESS: { label: 'In Progress', color: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-200' },
    DONE: { label: 'Done', color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-200' },
  };

  const currentStatus = statusConfig[task.status];

  const handleUpdate = async (data) => {
    await onUpdate(task.id, data);
    setIsEditing(false);
    onClose();
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(task.id);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgb(197_224_181)]/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-tl-none rounded-tr-[55px] rounded-bl-[55px] rounded-br-none"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <div className="p-6">
            <TaskForm
              initialData={task}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              disabled={updating}
            />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${currentStatus.bgColor} ${currentStatus.color}`}>
                  {currentStatus.label}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-[rgb(197_224_181)] hover:cursor-pointer bg-gray-200" disabled={updating || deleting}>
                <X className="h-5 w-5 text-lime-700" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <h2 className="text-2xl font-bold text-lime-700 mb-4 leading-tight">{task.title}</h2>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                {task.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                {task.updatedAt && task.updatedAt !== task.createdAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Updated: {format(new Date(task.updatedAt), 'MMM dd, yyyy')}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-lime-700 mb-2 uppercase tracking-wide">Description</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{task.description}</p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3">
              <Button onClick={() => setIsEditing(true)} className="flex-1 gap-2 bg-lime-700 hover:cursor-pointer" variant="default" disabled={deleting || updating}>
                <Edit2 className="h-4 w-4" />
                Edit Task
              </Button>
              <Button onClick={handleDeleteClick} className="flex-1 gap-2 hover:cursor-pointer" variant="destructive" disabled={deleting || updating}>
                <Trash2 className="h-4 w-4" />
                {deleting ? 'Deleting...' : 'Delete Task'}
              </Button>
            </div>

            {/* ✅ Custom Confirmation Dialog */}
            <ConfirmDialog
              open={showConfirm}
              title="Delete Task"
              description="Are you sure you want to delete this task? This action cannot be undone."
              onConfirm={handleConfirmDelete}
              onCancel={() => setShowConfirm(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailModal;
