import React, { useState, useEffect } from 'react';
import { PlusCircle, GraduationCap, Calendar } from 'lucide-react';
import { Subject, SubjectFormData } from './types';
import { SubjectCard } from './components/SubjectCard';
import { AddSubjectForm } from './components/AddSubjectForm';
import { WeeklyTimetable } from './components/WeeklyTimetable';

const COLORS = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
];

function App() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const calculateRequiredClasses = (totalClasses: number): number => {
    return Math.ceil(totalClasses * 0.8);
  };

  const handleAddSubject = (data: SubjectFormData) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      ...data,
      totalClasses: data.totalClasses,
      attendedClasses: 0,
      color: COLORS[subjects.length % COLORS.length],
      requiredClasses: calculateRequiredClasses(data.totalClasses),
    };
    setSubjects([...subjects, newSubject]);
    setShowForm(false);
  };

  const handleIncrement = (id: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === id
        ? { ...subject, attendedClasses: Math.min(subject.attendedClasses + 1, subject.totalClasses) }
        : subject
    ));
  };

  const handleDecrement = (id: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === id && subject.attendedClasses > 0
        ? { ...subject, attendedClasses: subject.attendedClasses - 1 }
        : subject
    ));
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const overallAttendance = subjects.length
    ? (subjects.reduce((sum, subject) => sum + subject.attendedClasses, 0) /
       subjects.reduce((sum, subject) => sum + subject.totalClasses, 0) * 100) || 0
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Attendance Planner</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTimetable(!showTimetable)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {showTimetable ? 'Hide' : 'Show'} Timetable
              </button>
              {subjects.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Overall Attendance</p>
                  <p className={`text-lg font-bold ${
                    overallAttendance >= 80 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {overallAttendance.toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showTimetable && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <WeeklyTimetable subjects={subjects} />
          </div>
        )}

        {subjects.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No subjects added yet</h3>
            <p className="mt-1 text-sm text-gray-500">Add your subjects with their total classes to start planning.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Subject
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Subject
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {showForm && (
        <AddSubjectForm
          onSubmit={handleAddSubject}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;