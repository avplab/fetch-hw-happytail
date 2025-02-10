import { ChangeEventHandler } from "react";

export interface CheckboxProps {
  value: boolean;
  onChange: ChangeEventHandler;
}
export default function Checkbox({ value, onChange }: CheckboxProps) {
  return (
    <label className="relative block w-12 h-7 rounded cursor-pointer">
      <input type="checkbox" checked={value} onChange={onChange} className="sr-only peer"/>
      <div className="bg-gray-300 peer-checked:bg-cyan-700 w-full h-full rounded-full transition-all" />
      <div className="
          absolute top-0 left-0 h-full aspect-square rounded-full border-3 transition-all
          peer-checked:left-full peer-checked:-translate-x-full
          border-gray-300 peer-checked:border-cyan-700 bg-white"
      />
    </label>
  )
}