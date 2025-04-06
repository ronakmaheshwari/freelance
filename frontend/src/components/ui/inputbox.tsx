interface Box {
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function Inputbox({ label, type, value, placeholder, onChange }: Box) {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-900">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200 bg-white text-gray-900"
        />
      </div>
    );
  }
