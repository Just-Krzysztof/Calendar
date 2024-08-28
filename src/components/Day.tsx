import { ReactNode } from 'react';

interface DayProps {
  day: number;
  onClick: () => void;
  selected: boolean;
  children?: ReactNode;
}

function Day({ day, onClick, selected, children }: DayProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center h-20 border rounded-md cursor-pointer ${
        selected ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {day}
      {children}
    </div>
  );
}

export default Day;