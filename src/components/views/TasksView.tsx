import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Check,
  Calendar,
  User,
  Filter,
  CheckCircle2,
  Trash2,
  X,
} from 'lucide-react';
import { FamilyTaskItem } from '../../types/family';

interface TasksViewProps {
  tasks: FamilyTaskItem[];
  onToggleTask?: (taskId: string) => void;
  onAddTask?: (task: FamilyTaskItem) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks: initialTasks, onToggleTask, onAddTask }) => {
  const [tasks, setTasks] = useState<FamilyTaskItem[]>(initialTasks);
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Mom');
  const [newTaskCategory, setNewTaskCategory] = useState<'chores' | 'school' | 'errands' | 'home'>('chores');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'normal' | 'low'>('normal');

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    if (onToggleTask) onToggleTask(id);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const created: FamilyTaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      assignedTo: newTaskAssignee,
      dueDate: 'Today',
      completed: false,
      priority: newTaskPriority,
      category: newTaskCategory,
    };

    setTasks((prev) => [created, ...prev]);
    if (onAddTask) onAddTask(created);
    setNewTaskTitle('');
    setIsAddModalOpen(false);
  };

  const filteredTasks = tasks.filter(
    (t) => filterAssignee === 'all' || t.assignedTo.toLowerCase() === filterAssignee.toLowerCase()
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Responsibility Hub</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">
              {completedCount} of {tasks.length} Completed
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Household Tasks & Delegations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Distributed accountability across parents and children to keep the home running smoothly.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Progress Bar Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-900">Today&apos;s Household Progress</span>
          <span className="font-bold text-slate-700">{progressPercent}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'Dad', 'Mom', 'Emma', 'Alex'].map((assignee) => (
          <button
            key={assignee}
            onClick={() => setFilterAssignee(assignee)}
            className={`text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors capitalize ${
              filterAssignee.toLowerCase() === assignee.toLowerCase()
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {assignee === 'all' ? 'All Responsibilities' : assignee}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
              task.completed
                ? 'bg-slate-50/60 border-slate-200 text-slate-400'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTask(task.id);
                }}
                className={`h-5 w-5 rounded-md flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-emerald-600 text-white'
                    : 'border-2 border-slate-300 hover:border-slate-400 bg-white'
                }`}
              >
                {task.completed && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
              </button>

              <div className="min-w-0">
                <span
                  className={`text-xs font-semibold block truncate ${
                    task.completed ? 'line-through text-slate-400' : 'text-slate-900'
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span>Assigned to {task.assignedTo}</span>
                  <span>·</span>
                  <span>Due {task.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  task.priority === 'high'
                    ? 'bg-rose-50 text-rose-700 border border-rose-100'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {task.priority}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 hidden sm:inline">
                {task.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900">Add Household Task</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Empty dishwasher / Buy milk"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assignee</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="Dad">Dad</option>
                    <option value="Mom">Mom</option>
                    <option value="Emma">Emma</option>
                    <option value="Alex">Alex</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
