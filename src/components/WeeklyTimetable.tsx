import React from 'react';
import { DAYS, TIME_SLOTS } from '../data/timetable';
import { Subject } from '../types';

interface WeeklyTimetableProps {
  subjects: Subject[];
}

export function WeeklyTimetable({ subjects }: WeeklyTimetableProps) {
  const getSubjectForSlot = (day: string, time: string) => {
    return subjects.find(subject =>
      subject.slots.some(slot => slot.day === day && slot.time === time)
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="sticky left-0 bg-gray-100 px-4 py-3 border-b font-semibold text-gray-900">Days</th>
            {TIME_SLOTS.map(({ time }) => (
              <th key={time} className="px-4 py-3 border-b font-semibold text-gray-900 whitespace-nowrap">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map(day => (
            <tr key={day} className="hover:bg-gray-50">
              <td className="sticky left-0 bg-gray-100 px-4 py-3 border-b font-medium text-gray-900 whitespace-nowrap">
                {day}
              </td>
              {TIME_SLOTS.map(({ time }) => {
                const subject = getSubjectForSlot(day, time);
                return (
                  <td 
                    key={`${day}-${time}`} 
                    className={`px-4 py-3 border-b text-center ${subject?.color || ''}`}
                  >
                    {subject && (
                      <div className="flex flex-col items-center">
                        <span className="font-medium text-gray-900">
                          {subject.name}
                        </span>
                        <span className="text-xs text-gray-600">
                          {subject.code}
                        </span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}