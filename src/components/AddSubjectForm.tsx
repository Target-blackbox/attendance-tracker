import React, { useState } from 'react';
import { SubjectFormData, TimeSlot } from '../types';
import { X, Plus, Minus } from 'lucide-react';
import { DAYS, TIME_SLOTS } from '../data/timetable';

interface AddSubjectFormProps {
  onSubmit: (data: SubjectFormData) => void;
  onClose: () => void;
}

export function AddSubjectForm({ onSubmit, onClose }: AddSubjectFormProps) {
  const [formData, setFormData] = useState<SubjectFormData>({
    name: '',
    code: '',
    professor: '',
    slots: [{ day: DAYS[0], time: TIME_SLOTS[0].time, slot: `Slot-${TIME_SLOTS[0].id}` }],
    totalClasses: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots, { day: DAYS[0], time: TIME_SLOTS[0].time, slot: `Slot-${TIME_SLOTS[0].id}` }],
    });
  };

  const removeTimeSlot = (index: number) => {
    setFormData({
      ...formData,
      slots: formData.slots.filter((_, i) => i !== index),
    });
  };

  const updateSlot = (index: number, field: keyof TimeSlot, value: string) => {
    const newSlots = [...formData.slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    if (field === 'time') {
      const slotNumber = TIME_SLOTS.findIndex(slot => slot.time === value) + 1;
      newSlots[index].slot = `Slot-${slotNumber}`;
    }
    setFormData({ ...formData, slots: newSlots });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Add New Subject</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Computer Networks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject Code
            </label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CSEN3031"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professor Name
            </label>
            <input
              type="text"
              required
              value={formData.professor}
              onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Dr. Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Slots
            </label>
            {formData.slots.map((slot, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <select
                  value={slot.day}
                  onChange={(e) => updateSlot(index, 'day', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DAYS.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select
                  value={slot.time}
                  onChange={(e) => updateSlot(index, 'time', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TIME_SLOTS.map(({ time }) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {formData.slots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Minus size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTimeSlot}
              className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <Plus size={16} className="mr-1" />
              Add Time Slot
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Classes in Semester
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.totalClasses || ''}
              onChange={(e) => setFormData({ ...formData, totalClasses: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 45"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
}