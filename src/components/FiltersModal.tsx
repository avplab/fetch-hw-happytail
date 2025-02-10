import { ChangeEventHandler, Suspense, useMemo, useState } from "react"
import ReactDOM from "react-dom"
import options from '@/assets/options.json'
import BreedFilter from "@/components/BreedFilter"
import RangeSlider from "@/components/RangeSlider"
import SortBy from "@/components/SortBy"
import Button from "@/components/Button"
import Checkbox from "@/components/Checkbox"

import { breeds } from '@/api/dogs'
import { SearchOptions } from "@/types"

export interface FiltersModalProps {
  activeFilters: SearchOptions;
  onApplyFilters: (filters: SearchOptions, filtersCount: number) => void;
  onClose: () => void;  
}

export default function FiltersModal({ activeFilters, onApplyFilters, onClose }: FiltersModalProps) {
  const[activeBreeds, setActiveBreeds] = useState(activeFilters.breeds || [])
  const[ageMin, setAgeMin] = useState(activeFilters.ageMin || options.ageMin)
  const[ageMax, setAgeMax] = useState(activeFilters.ageMax || options.ageMax)
  const[sort, setSort] = useState(activeFilters.sort || {field: options.sortField, order: options.sortOrder})
  const[showFavoritesOnly, setShowFavoritesOnly] = useState(activeFilters.favoritesOnly || false)

  const handleVisible = () => {
    onClose()
  }

  const handleAddBreed = (breed: string) => {
    setActiveBreeds([...activeBreeds, breed])
  }

  const handleRemoveBreed = (breed: string) => {
    setActiveBreeds(activeBreeds.filter(b => b !== breed))
  }

  const handleAgeChange = (min: number, max: number) => {
    setAgeMin(min)
    setAgeMax(max)
  }

  const handleFavoritesOnly: ChangeEventHandler = (e) => {
    setShowFavoritesOnly((e.target as HTMLInputElement).checked)
  }

  const breedsFetcher = useMemo<Promise<string[]>>(() => new Promise((resolve) => {
    const breedsList = localStorage.getItem('breeds')
    if (breedsList) {
      resolve(JSON.parse(breedsList))
    } else {
      breeds()
        .then((breedsList) =>{
          localStorage.setItem('breeds', JSON.stringify(breedsList))
          resolve(breedsList)
        })
    }
  }), [])

  const handleApplyFilters = () => {
    const filters: SearchOptions = {}
    
    if (showFavoritesOnly) {
      filters.favoritesOnly = true
    }
    if (activeBreeds.length > 0) {
      filters.breeds = activeBreeds
    }
    if (ageMin > options.ageMin) {
      filters.ageMin = ageMin
    }
    if (ageMax < options.ageMax) {
      filters.ageMax = ageMax
    }
    if (sort.field) {
      filters.sort = sort
    }
    onApplyFilters(filters, Object.keys(filters).length)
  }

  const handleClearFilters = () => {
    setActiveBreeds([])
    handleAgeChange(options.ageMin, options.ageMax)
    setSort({ field: '', order: false })
    setShowFavoritesOnly(false)
  }

  const component = (
    <div className="fixed overflow-hidden top-0 left-0 w-full h-dvh bg-[rgb(0,0,0,0.5)] z-100 flex flex-col justify-center p-3">
      
      {/* modal */}
      <div className="flex flex-col justify-between rounded-2xl bg-white md:w-2xl md:mx-auto h-screen overflow-hidden">
        
        {/* header */}
        <div className="flex items-center border-b-2 border-b-gray-200">
          <button onClick={handleVisible} className="w-14 h-14 cursor-pointer">
            <span className="text-2xl! text-black material-symbols-outlined pointer-events-none select-none">close</span>
          </button>
          <span className="flex-1 text-center pr-14 font-bold">Filters</span>
        </div>

        {/* content */}
        <div className="flex-1 flex-col gap-10 px-3 overflow-auto">
          
          {/* favorites only filter */}
          <div className="border-b-gray-200 border-b-1 pb-6 last:border-0 flex justify-between items-center relative">
            <span className="block text-lg font-medium py-4">Show Favorites Only</span>
            <div className="">
              <Checkbox value={showFavoritesOnly} onChange={handleFavoritesOnly} />
            </div> 
          </div>

        <div className={`relative ${showFavoritesOnly ? 'opacity-25' : ''}`}>
          { showFavoritesOnly && <div className="absolute backdrop-saturate-0 left-0 top-0 w-full h-full z-1000"></div>} 
            {/* breeds filter */}
            <div className="border-b-gray-200 border-b-1 pb-6 last:border-0">
              <span className="block text-lg font-medium py-4">Desired breeds</span>
              <Suspense fallback={<span>Loading breeds</span>}>
                <BreedFilter 
                  breedsFetcher={breedsFetcher}
                  activeBreeds={activeBreeds}
                  onSelect={handleAddBreed} 
                  onRemove={handleRemoveBreed}
                />
              </Suspense>
            </div>

            {/* age range filter */}
            <div className="border-b-gray-200 border-b-1 pb-6 last:border-0">
              <span className="block text-lg font-medium py-4">Age range</span>
              <RangeSlider 
                rangeMin={options.ageMin} 
                rangeMax={options.ageMax}  
                valueLeft={ageMin}
                valueRight={ageMax}
                onChange={handleAgeChange}
              />
              <div className="flex justify-between mt-3">
                  <span>Min: {ageMin}</span>
                  <span>Max: {ageMax}</span>
              </div>
            </div>

            {/* sorting filter */}
            <div className="border-b-gray-200 border-b-1 pb-3 last:border-0 border-1">
              <span className="block text-lg font-medium py-4">Sort By</span>
              <SortBy config={sort} onChange={setSort}/>
            </div>
          </div>
        </div>

        {/* actions */}
        <div className="flex justify-between items-center h-18 p-3 border-t-2 border-t-gray-200">
          <Button 
              onClick={handleClearFilters}
              className="h-10! font-semibold">Clear All
          </Button>
          <Button 
            onClick={handleApplyFilters}
            className="bg-cyan-800! hover:bg-black active:bg-black text-white rounded-2xl px-10 font-bold cursor-pointer
          ">Apply Filters
          </Button>
        </div>
      </div>
    </div>
  )
  // return component

  return (
    ReactDOM.createPortal(component, document.body)
  )
}