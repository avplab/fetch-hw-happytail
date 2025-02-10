export default function Icon({ name, className }: { name: string, className?: string}) {
  return <span className={`material-symbols-outlined pointer-events-none select-none text-center ${className}`}>{name}</span>  
}