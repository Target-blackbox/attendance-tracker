import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import { DAYS, TIME_SLOTS } from '../data/timetable';
import { Subject, StarredSlot } from '../types';

interface WeeklyTimetableProps {
  subjects: Subject[];
}

export function WeeklyTimetable({ subjects }: WeeklyTimetableProps) {
  const [starredSlots, setStarredSlots] = useState<StarredSlot[]>([]);

  const getSubjectForSlot = (day: string, time: string) => {
    return subjects.find(subject =>
      subject.slots.some(slot => slot.day === day && slot.time === time)
    );
  };

  const isSlotStarred = (subjectId: string, day: string, time: string) => {
    return starredSlots.some(
      slot => 
        slot.subjectId === subjectId && 
        slot.day === day && 
        slot.time === time
    );
  };

  const toggleStar = (subjectId: string, day: string, time: string) => {
    setStarredSlots(prev => {
      const isCurrentlyStarred = isSlotStarred(subjectId, day, time);
      if (isCurrentlyStarred) {
        return prev.filter(
          slot => 
            !(slot.subjectId === subjectId && 
              slot.day === day && 
              slot.time === time)
        );
      } else {
        return [...prev, { subjectId, day, time }];
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow max-w-4xl mx-auto">
      <table className="w-full bg-white text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 bg-gray-100 p-2 border-b font-semibold text-gray-900 text-xs">Days</th>
            {TIME_SLOTS.map(({ time }) => (
              <th key={time} className="p-2 border-b font-semibold text-gray-900 whitespace-nowrap text-xs">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map(day => (
            <tr key={day} className="hover:bg-gray-50">
              <td className="sticky left-0 bg-gray-100 p-2 border-b font-medium text-gray-900 whitespace-nowrap text-xs">
                {day}
              </td>
              {TIME_SLOTS.map(({ time }) => {
                const subject = getSubjectForSlot(day, time);
                const isStarred = subject ? isSlotStarred(subject.id, day, time) : false;

                return (
                  <td 
                    key={`${day}-${time}`} 
                    className={`p-2 border-b text-center ${subject?.color || ''}`}
                  >
                    {subject && (
                      <div className="flex flex-col items-center group relative">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-900 text-xs">
                            {subject.name}
                          </span>
                          <button
                            onClick={() => toggleStar(subject.id, day, time)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            aria-label={isStarred ? "Unstar class" : "Star class"}
                          >
                            {isStarred ? (
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="w-3 h-3 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <span className="text-[10px] text-gray-600">
                          {subject.code}
                        </span>
                        {isStarred && (
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
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