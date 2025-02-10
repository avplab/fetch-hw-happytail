import FavoriteIcon from "@/components/FavoriteIcon";

export default function FavoriteBadge({ active = false }) {
  return (
    <FavoriteIcon className={`stroke-white stroke-2 ${active ? 'fill-red-500' : 'fill-[rgb(0,0,0,0.5)]'}`} />
  )
}