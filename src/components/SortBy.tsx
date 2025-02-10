import { SortOption } from "@/types";
import Button from "@/components/Button"
import Icon from "@/components/Icon"

export interface SortByProps {
  config: SortOption;
  onChange: (sortConfig: SortOption) => void;
}

export default function SortBy({ config, onChange }: SortByProps) { 
  const handleField = (name: string) => {
    if (config.field === name) {
      if (config.order) {
        onChange({ field: '', order: false })
      } else {
        onChange({ field: name, order: !config.order })
      }
    } else {
      onChange({ field: name, order: false })
    }
  }

  const fields = ['breed', 'name', 'age']

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3">
      { fields.map(name => (
        <Button
          key={name} 
          onClick={() => handleField(name)}
          className={`w-full sm:w-1/3 border-2
            ${config.field === name 
              ? 'border-black' 
              : 'border-gray-200 hover:border-black active:border-black hover:border-1'
            }
          `}
        >
          { config.field === name && <Icon name={ config.order ? 'arrow_downward' : 'arrow_upward' }/>}
          <span className="text-xl text-gray-900 pointer-events-none">{name}</span>
        </Button>
      ))}
    </div>
  )
}