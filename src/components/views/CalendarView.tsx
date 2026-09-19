import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Filter,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { CalendarEvent, FamilyMember } from '../../types/family';
import { MemberAvatar } from '../MemberAvatar';
import { AiInsightTag } from '../AlexaAudeMark';

interface CalendarViewProps {
  events: CalendarEvent[];
  familyMembers: FamilyMember[];
  onAddEvent?: (newEvent: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, familyMembers, onAddEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('15:00');
  const [newEventDate, setNewEventDate] = useState('2026-09-20');
  const [newEventCategory, setNewEventCategory] = useState('family');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesMember =
      selectedMemberId === 'all' || evt.memberIds.includes(selectedMemberId);
    return matchesCat && matchesMember;
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const created: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      startTime: newEventTime,
      endTime: '16:00',
      dateStr: newEventDate,
      category: newEventCategory as any,
      memberIds: selectedMemberId === 'all' ? familyMembers.map((m) => m.id) : [selectedMemberId],
      location: 'Worli Sky Villa, Mumbai',
    };

    if (onAddEvent) {
      onAddEvent(created);
    }
    setIsAddModalOpen(false);
    setNewEventTitle('');
    setToastMessage(`Added event: ${created.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 text-xs shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Shared Calendar</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-500">September 2026</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Family Schedule & School Calendar</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified view of work leadership, school pickups, sports practices, and parent-teacher meetings.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Add Family Event</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Member Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedMemberId('all')}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              selectedMemberId === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Family
          </button>
          {familyMembers.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMemberId(m.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedMemberId === m.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MemberAvatar member={m} size="xs" />
              <span>{m.nickname}</span>
            </button>
          ))}
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs focus:outline-none focus:border-slate-900"
          >
            <option value="all">All Categories</option>
            <option value="school">School</option>
            <option value="ptm">PTM Meetings</option>
            <option value="work">Work</option>
            <option value="family">Family</option>
            <option value="home_service">Home Service</option>
            <option value="health">Health</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <CalendarIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No events found</p>
            <p className="text-xs text-slate-400 mt-1">Try selecting a different family member or category</p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-700 flex-shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {evt.dateStr.split('-')[1]}/{evt.dateStr.split('-')[2]}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{evt.startTime}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">{evt.title}</h4>
                    {evt.isHighPriority && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                        Priority
                      </span>
                    )}
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {evt.category}
                    </span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-slate-500 mt-1">{evt.description}</p>
                  )}

                  {evt.location && (
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1.5">
                      <MapPin className="h-3 w-3" />
                      <span>{evt.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Attendees avatars */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <div className="flex -space-x-1.5">
                  {evt.memberIds.map((mId) => {
                    const member = familyMembers.find((m) => m.id === mId);
                    if (!member) return null;
                    return (
                      <MemberAvatar
                        key={mId}
                        member={member}
                        size="sm"
                        className="ring-2 ring-white"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900">Add New Family Event</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Piano Recital / Dentist"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time</label>
                  <input
                    type="time"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-slate-900"
                >
                  <option value="school">School / Academic</option>
                  <option value="ptm">PTM Meeting</option>
                  <option value="family">Family Outing / Dinner</option>
                  <option value="health">Health / Clinic</option>
                  <option value="home_service">Home Maintenance</option>
                  <option value="work">Work Commitment</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 shadow-xs"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
