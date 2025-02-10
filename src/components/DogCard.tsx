import { Dog } from "@/types";
import Icon from "@/components/Icon";

export default function DogCard({ dog }: { dog: Dog}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-square overflow-hidden">
        <img src={dog.img} className="w-full h-full object-cover rounded-2xl" />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-xl font-semibold">{dog.name}, {dog.age}</span>
          <div className="flex flex-row justify-end">
            <Icon name="location_on" />
            <span>{dog.zip_code}</span>
          </div>
        </div>
        <span className="text-xl">{dog.breed}</span>
      </div>
    </div>
  )  
} 