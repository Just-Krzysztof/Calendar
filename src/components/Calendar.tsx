import { useState, useEffect } from 'react';
import { getDaysInMonth, getDay, format } from 'date-fns';
import Day from './Day';
import Modal from './Modal';
import './Calendar.css';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface Event {
  day: number;
  month: number;
  year: number;
  title: string;
  completed: boolean;
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    } else {
      localStorage.removeItem('calendarEvents');
    }
  }, [events]);

  const daysInMonth = getDaysInMonth(currentDate);
  const monthName = format(currentDate, 'MMMM');
  const year = format(currentDate, 'yyyy');

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDayOfWeek = getDay(firstDayOfMonth);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleViewEventsClick = () => {
    setIsViewModalOpen(true);
  };

  const handleAddEvent = () => {
    if (selectedDay !== null && newEventTitle) {
      const newEvent: Event = {
        day: selectedDay,
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        title: newEventTitle,
        completed: false,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setNewEventTitle('');
      setIsModalOpen(false);
    }
  };

  const toggleEventCompletion = (eventIndex: number) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event, index) =>
        index === eventIndex ? { ...event, completed: !event.completed } : event
      );
      return updatedEvents;
    });
  };

  return (
    <div className="w-4/4 p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-4 py-2 bg-gray-300 rounded-md">
          Prev
        </button>
        <h2 className="text-lg font-semibold">
          {monthName} {year}
        </h2>
        <button onClick={handleNextMonth} className="px-4 py-2 bg-gray-300 rounded-md">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(startDayOfWeek)].map((_, index) => (
          <div key={`empty-${index}`} className="h-20"></div>
        ))}
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dayEvents = events.filter(
            (event) =>
              event.day === day &&
              event.month === currentDate.getMonth() &&
              event.year === currentDate.getFullYear()
          );

          return (
            <Day
              key={day}
              day={day}
              onClick={() => handleDayClick(day)}
              selected={selectedDay === day}
            >
              {dayEvents.length > 0 && (
                <div className="relative">
                  <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
                    {dayEvents.length > 9 ? '9+' : dayEvents.length}
                  </span>
                </div>
              )}
            </Day>
          );
        })}
      </div>
      <div className="w-1/1 mt-4">
        <button
          onClick={handleViewEventsClick}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          View All Tasks
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Tasks on Day {selectedDay}</h2>
        <div className="mb-4">
          {events
            .filter(
              (event) =>
                event.day === selectedDay &&
                event.month === currentDate.getMonth() &&
                event.year === currentDate.getFullYear()
            )
            .map((event, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={event.completed}
                  onChange={() => toggleEventCompletion(events.indexOf(event))}
                  className="mr-2"
                />
                <div className={`${event.completed ? 'line-through text-gray-500' : ''}`}>
                  {event.title}
                </div>
              </div>
            ))}
        </div>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter event title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        />
        <button
          onClick={handleAddEvent}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Event
        </button>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">
          Tasks for {monthName} {year}
        </h2>
        <div className="overflow-y-auto max-h-80">
          {events.map((event, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="checkbox"
                checked={event.completed}
                onChange={() => toggleEventCompletion(index)}
                className="mr-2"
              />
              <div className={`${event.completed ? 'line-through text-gray-500' : ''}`}>
                {event.title}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default Calendar;