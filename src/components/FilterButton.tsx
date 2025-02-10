import Button from "@/components/Button";
import Icon from "@/components/Icon";

export default function FilterButton({ active = 0, onClick = () => {} }) {
  return (
    <Button onClick={onClick}
      className={`
        relative
        hover:border-black active:border-black
        border-2 ${active > 0 ? 'border-black' : 'border-gray-200 '}
    `}>
      <Icon name="tune" className="text-2xl! text-gray-700" />
      <span className="hidden sm:inline">Filters</span>
      {/* badge */}
      { active > 0 &&
        <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-6 h-6 flex justify-center items-center rounded-full border-2 border-white bg-black text-xs text-white font-bold">
            {active}
        </span>
      }
   </Button>
  )
}