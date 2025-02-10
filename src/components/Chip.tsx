import { MouseEventHandler } from "react";

export interface ChipProps {
  title: string;
  onClose: MouseEventHandler;
}

export default function Chip({ title, onClose }: ChipProps) {
  return (
    <div className="flex items-center bg-gray-300 rounded-full h-full text-center content-center">
      <span className="pl-4 text-nowrap">{title}</span>
      <span className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-full border-5 border-gray-300 hover:bg-gray-400 active:bg-gray-400 group" onClick={onClose}>
        <span className="text-xl! text-gray-500 material-symbols-outlined group-hover:text-white">clear</span>
      </span>
    </div>
  )
}