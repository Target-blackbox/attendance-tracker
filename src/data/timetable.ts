export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TIME_SLOTS = [
  { id: '1', time: '8-9 am' },
  { id: '2', time: '9-10 am' },
  { id: '3', time: '10-11 am' },
  { id: '4', time: '11-12 pm' },
  { id: '5', time: '12-1 pm' },
  { id: '6', time: '1-2 pm' },
  { id: '7', time: '2-3 pm' },
  { id: '8', time: '3-4 pm' },
  { id: '9', time: '4-5 pm' },
  { id: '10', time: '5-6 pm' },
];

export const INITIAL_SUBJECTS = [
  {
    code: 'CSEN3031',
    slots: [
      { day: 'Monday', time: '8-9 am', slot: 'Slot-1' },
      { day: 'Friday', time: '10-11 am', slot: 'Slot-3' }
    ]
  },
  {
    code: 'CSEN3071',
    slots: [
      { day: 'Monday', time: '9-10 am', slot: 'Slot-2' },
      { day: 'Tuesday', time: '11-12 pm', slot: 'Slot-4' },
      { day: 'Thursday', time: '10-11 am', slot: 'Slot-3' }
    ]
  },
  {
    code: 'CLAD2031',
    slots: [
      { day: 'Monday', time: '10-11 am', slot: 'Slot-3' }
    ]
  },
  {
    code: 'CLAD2031',
    slots: [
      { day: 'Monday', time: '11-12 pm', slot: 'Slot-4' }
    ]
  },
  {
    code: 'FINA3011',
    slots: [
      { day: 'Monday', time: '12-1 pm', slot: 'Slot-5' },
      { day: 'Wednesday', time: '12-1 pm', slot: 'Slot-5' },
      { day: 'Friday', time: '12-1 pm', slot: 'Slot-5' }
    ]
  },
  // Add other subjects similarly
];