export const DaySelector = ({
    selectedDays,
    onToggleDay,
    label,
  }: {
    selectedDays: number[];
    onToggleDay: (day: number) => void;
    label: string;
  }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">{label}</label>
        <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-lg shadow-md">
          {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
            <div
              key={day}
              onClick={() => onToggleDay(day)}
              className={`flex items-center justify-center border rounded-lg p-2 cursor-pointer ${
                selectedDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };