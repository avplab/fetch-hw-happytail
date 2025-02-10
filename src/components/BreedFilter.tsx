import { useMemo, useState, use, ChangeEventHandler } from 'react'
import { bounce } from '../utils/bounce'
import Chip from "./Chip"

export interface BreedFilterProps {
  breedsFetcher: Promise<string[]>;
  activeBreeds: string[];
  onSelect: (breed:string) => void;
  onRemove: (breed: string) => void;
}

export default function BreedFilter({ breedsFetcher, activeBreeds = [], onSelect, onRemove}: BreedFilterProps) {
  const [query, setQuery] = useState('')
  const [matchedBreeds, setMatchedBreeds] = useState<string[]>([])
  const breedsList = use(breedsFetcher)

  const matchBreeds = useMemo(() => bounce((q: string) => {
    if (q) {
      const activeBreedsIds = new Set<string>(activeBreeds)
      setMatchedBreeds(
        breedsList
          .filter((b: string) => !activeBreedsIds.has(b))
          .filter((b: string) => b.toLowerCase().startsWith(q.toLowerCase()))
      )
    } else {
      setMatchedBreeds([])
    }
  }, 500), [ activeBreeds ])

  const handleQuery: ChangeEventHandler = (e) => {
    const q = (e.target as HTMLInputElement).value
    setQuery(q)
    matchBreeds(q)
  }

  const handleSelectBreed = (breed: string) => {
    setMatchedBreeds([])
    setQuery('')
    onSelect(breed)
  }

  return (
    <>
      <label htmlFor="breed" className="relative block rounded-full overflow">
        <input id="breed" className="h-12 w-full bg-white pl-3 outline-none rounded-2xl border-2 border-gray-200" placeholder="Select breeds" value={query} onChange={handleQuery}/>
        { matchedBreeds.length > 0 &&
          <ul className="absolute bg-white w-full rounded-3xl border-1 mt-1 overflow-hidden max-h-dvh z-10">
            {
              matchedBreeds.map(breed => <li 
                key={breed} 
                onClick={() => handleSelectBreed(breed)}
                className="p-3 hover:bg-gray-200 cursor-pointer"
              >
                {breed}
              </li>)
            }
          </ul>
        }
      </label>
      { activeBreeds.length > 0 &&
        <div className="w-full flex flex-wrap gap-1 mt-3">
          {activeBreeds.map(breed => <Chip key={breed} title={breed} onClose={() => onRemove(breed)} />)}
        </div>
      }
    </>
  )
}
