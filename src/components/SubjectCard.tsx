import React from 'react';
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SubjectCard({ subject, onIncrement, onDecrement, onDelete }: SubjectCardProps) {
  const attendancePercentage = (subject.attendedClasses / subject.totalClasses) * 100;
  const isLowAttendance = attendancePercentage < 80;
  const remainingRequired = Math.max(0, subject.requiredClasses - subject.attendedClasses);
  const canStillAchieveTarget = subject.attendedClasses + (subject.totalClasses - (subject.attendedClasses + (subject.totalClasses - subject.attendedClasses))) >= subject.requiredClasses;

  return (
    <div className={`p-6 rounded-lg shadow-lg ${subject.color} transform transition-all duration-300 hover:scale-105`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
          <p className="text-gray-600">Prof. {subject.professor}</p>
          <p className="text-gray-600">{subject.schedule}</p>
        </div>
        <button
          onClick={() => onDelete(subject.id)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Attendance:</span>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onDecrement(subject.id)}
              className="p-1 hover:text-red-500 transition-colors"
              disabled={subject.attendedClasses === 0}
            >
              <MinusCircle size={20} />
            </button>
            <span className="text-lg font-semibold">
              {subject.attendedClasses}/{subject.totalClasses}
            </span>
            <button
              onClick={() => onIncrement(subject.id)}
              className="p-1 hover:text-green-500 transition-colors"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              isLowAttendance ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(100, attendancePercentage)}%` }}
          ></div>
        </div>

        <div className="space-y-1">
          <p className={`text-right font-medium ${
            isLowAttendance ? 'text-red-600' : 'text-green-600'
          }`}>
            Current: {attendancePercentage.toFixed(1)}%
          </p>
          
          <div className="text-sm">
            <p className="text-gray-600">
              Required for 80%: {subject.requiredClasses} classes
            </p>
            {remainingRequired > 0 ? (
              <p className={`font-medium ${canStillAchieveTarget ? 'text-yellow-600' : 'text-red-600'}`}>
                Must attend {remainingRequired} more {remainingRequired === 1 ? 'class' : 'classes'}
              </p>
            ) : (
              <p className="text-green-600 font-medium">Target achieved! 🎉</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}