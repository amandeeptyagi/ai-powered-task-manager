import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import TaskStats from '@/components/tasks/TaskStats';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createTask, getTasks, updateTask, deleteTask } from '@/services/taskApi';

const UserDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const [creating, setCreating] = useState(false);
  const handleCreateTask = async (data) => {
    setCreating(true);
    try {
      await createTask(data);
      toast.success('Task created successfully');
      await fetchTasks();
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setCreating(false);
    }
  };

  const [updating, setUpdating] = useState(false);
  const handleUpdateTask = async (id, data) => {
    setUpdating(true);
    try {
      await updateTask(id, data);
      toast.success('Task updated successfully');
      await fetchTasks();
      setEditingTask(null);
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setUpdating(false);
    }
  };

  const [deleting, setDeleting] = useState(false);
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-lime-700 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lime-700">Here’s what you need to do today</p>
        </div>

        <TaskStats tasks={tasks} />

        <div className="flex flex-col justify-between items-center mb-5">
          <Button
            onClick={() => setShowForm(true)}
            className="gap-2 bg-white text-lime-700 hover:bg-lime-700 hover:text-white border-2 border-lime-700 rounded-tl-none rounded-tr-[12px] rounded-bl-[12px] rounded-br-none hover:shadow-md cursor-pointer h-12 w-35 "
            disabled={creating || updating || deleting}
          >
            <Plus className="h-10 w-10" />
            New Task
          </Button>
        </div>

        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            disabled={creating}
          />
        )}

        <div className="mt-10 mb-5"> 
          <h2 className="text-2xl text-center font-bold text-lime-700">Your Tasks</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            editingTask={editingTask}
            onUpdate={handleUpdateTask}
            onCancelEdit={() => setEditingTask(null)}
            deleting={deleting}
            updating={updating}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
