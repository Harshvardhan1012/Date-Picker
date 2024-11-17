import { InputFieldProps } from "../types/type";

export const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    type = "text",
    min,
    className = "",
  }) => (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
        
      />
    </div>
  );