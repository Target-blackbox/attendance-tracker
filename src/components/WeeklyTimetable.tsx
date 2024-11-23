import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import { DAYS, TIME_SLOTS } from '../data/timetable';
import { Subject, StarredSubjects } from '../types';

interface WeeklyTimetableProps {
  subjects: Subject[];
}

export function WeeklyTimetable({ subjects }: WeeklyTimetableProps) {
  const [starredSubjects, setStarredSubjects] = useState<StarredSubjects>({});

  const getSubjectForSlot = (day: string, time: string) => {
    return subjects.find(subject =>
      subject.slots.some(slot => slot.day === day && slot.time === time)
    );
  };

  const toggleStar = (subjectId: string) => {
    setStarredSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
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
                      <div className="flex flex-col items-center group relative">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {subject.name}
                          </span>
                          <button
                            onClick={() => toggleStar(subject.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
                            aria-label={starredSubjects[subject.id] ? "Unstar subject" : "Star subject"}
                          >
                            {starredSubjects[subject.id] ? (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <span className="text-xs text-gray-600">
                          {subject.code}
                        </span>
                        {starredSubjects[subject.id] && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
                        )}
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