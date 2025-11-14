import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { X } from 'lucide-react';

const TaskForm = ({ onSubmit, onCancel, initialData = null, disabled = false }) => {
  const [formData, setFormData] = useState(
    initialData || { title: '', description: '', status: 'TO_DO' }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="shadow-lg border-2 rounded-tl-none rounded-tr-[42px] rounded-bl-[42px] rounded-br-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl text-lime-700">{initialData ? 'Edit Task' : 'Create New Task'}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel} disabled={disabled} className="hover:bg-[rgb(197_224_181)] hover:cursor-pointer">
          <X className="h-4 w-4 text-lime-700" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-lime-700">Title</label>
            <Input
              type="text"
              className="border-lime-700"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-lime-700">Description</label>
            <textarea
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Enter detailed description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-lime-700">Status</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              disabled={disabled}
            >
              <option value="TO_DO" className='hover:bg-lime-700'>To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 text-black bg-[rgb(197_224_181)] hover:bg-lime-700 hover:text-white hover:cursor-pointer" disabled={disabled}>
              {disabled ? (initialData ? 'Updating...' : 'Creating...'):(initialData ? 'Update Task' : 'Create Task')}
              {/* {initialData ? 'Update Task' : 'Create Task'} */}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 text-black hover:bg-black hover:text-white hover:cursor-pointer" disabled={disabled}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
