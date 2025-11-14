import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-react';

const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'TO_DO').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    done: tasks.filter((t) => t.status === 'DONE').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'bg-lime-700',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: Clock,
      color: 'bg-lime-700',
      bgColor: 'bg-red-50',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: TrendingUp,
      color: 'bg-lime-700',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Completed',
      value: stats.done,
      icon: CheckCircle2,
      color: 'bg-lime-700',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow rounded-tl-none rounded-tr-[22px] rounded-bl-[22px] rounded-br-none border-3 border-lime-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-lime-700 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-lime-700">{stat.value}</h3>
                {stat.title === 'Completed' && stats.total > 0 && (
                  <p className="text-xs text-lime-700 mt-1">{completionRate}% completion</p>
                )}
              </div>
              <div className={`${stat.bgColor} p-2 md:p-3 lg:p-3 rounded-lg`}>
                <stat.icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskStats;