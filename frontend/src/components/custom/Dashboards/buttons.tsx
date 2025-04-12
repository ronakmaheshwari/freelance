import React from "react";

interface ButtonSchema {
  title: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

export default function Buttons({ title, icon, onClick }: ButtonSchema) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full px-4 py-3 text-left rounded-md transition-colors duration-200  bg-neutral-100 inset-shadow-blue-500/50
        text-gray-700 dark:text-gray-200 
        hover:bg-blue-100 hover:inset-shadow-lg hover:text-blue-700 
        dark:hover:bg-gray-800 dark:hover:text-white"
      title={title}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-md font-medium hidden md:inline">{title}</span>
    </button>
  );
}
