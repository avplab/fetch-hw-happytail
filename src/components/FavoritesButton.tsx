import { MouseEventHandler } from 'react';
import Button from '@/components/Button';
import FavoriteIcon from '@/components/FavoriteIcon';

export interface FavoritesButtonProps {
  title: string;
  onClick: MouseEventHandler
}
export default function FavoritesButton({ title, onClick }: FavoritesButtonProps) {
  return (
    <Button className="border-2 bg-cyan-700! text-white" onClick={onClick}>
      <span className="hidden sm:inline">Find My Match!</span>
      <FavoriteIcon className="stroke-2 fill-amber-500 w-8 h-8 pointer-events-none"/>
      <span className="text-l pointer-events-none">{title}</span>
    </Button>
  )  
}