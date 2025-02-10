import { createContext, useContext, useEffect, useReducer } from 'react'
import DogCard from '@/components/DogCard'
import FavoriteBadge from '@/components/FavoriteBadge'
import FilterButton from '@/components/FilterButton'
import FiltersModal from '@/components/FiltersModal'
import Logo from '@/components/Logo'
import Paginator from '@/components/Paginator'
import FavoritesButton from '@/components/FavoritesButton'
import Loader from '@/components/Loader'
import NoSearchResults from '@/components/NoSearchResults'
import { search, details, match } from '@/api/dogs'
import options from '@/assets/options.json'
import useApiErrorHandlers from '@/hooks/useApiErrorHandlers'
import { Dog, SearchActions, SearchContextValue, SearchOptions, SearchState } from '@/types'

const SearchContext = createContext<SearchContextValue | null>(null)

function useSearchContext(): SearchContextValue {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchContext.Provider");
  }
  return context
}

const initialState: SearchState = {
  showFilterOptions: false,
  searchOptions: {},
  activatedSearchOptionsCount: 0,
  favorites: new Set(),
  matchedDogs: [],
  favoriteDogMatched: {},
  showFavoriteDogMatched: false,
  isLoading: false,
  total: 0,
  currentPage: 1,
  pageSize: options.searchResultPageSize,
}

export const SearchActionTypes = Object.freeze({
  TOGGLE_FILTER_OPTIONS: 'TOGGLE_FILTER_OPTIONS',
  SET_SEARCH_OPTIONS: 'SET_SEARCH_OPTIONS',
  SET_ACTIVATED_SEARCH_COUNT: 'SET_ACTIVATED_SEARCH_COUNT',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  SET_MATCHED_DOGS: 'SET_MATCHED_DOGS',
  SET_FAVORITE_DOG_MATCHED: 'SET_FAVORITE_DOG_MATCHED',
  TOGGLE_FAVORITE_DOG_MATCHED: 'TOGGLE_FAVORITE_DOG_MATCHED',
  SET_LOADING: 'SET_LOADING',
  SET_TOTAL: 'SET_TOTAL',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_PAGE_SIZE: 'SET_PAGE_SIZE',
})

function searchReducer(state: SearchState, action: { type: string, payload: any }): SearchState {
  switch (action.type) {
    case SearchActionTypes.TOGGLE_FILTER_OPTIONS:
      return { ...state, showFilterOptions: action.payload }
    case SearchActionTypes.SET_SEARCH_OPTIONS:
      return { ...state, searchOptions: action.payload }
    case SearchActionTypes.SET_ACTIVATED_SEARCH_COUNT:
      return { ...state, activatedSearchOptionsCount: action.payload }
    case SearchActionTypes.TOGGLE_FAVORITE: {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(action.payload)) {
        newFavorites.delete(action.payload);
      } else if (newFavorites.size < options.maxFavorites) {
        newFavorites.add(action.payload);
      }
      return { ...state, favorites: newFavorites };
    }
    case SearchActionTypes.SET_MATCHED_DOGS:
      return { ...state, matchedDogs: action.payload }
    case SearchActionTypes.SET_FAVORITE_DOG_MATCHED:
      return { ...state, favoriteDogMatched: action.payload }
    case SearchActionTypes.TOGGLE_FAVORITE_DOG_MATCHED:
      return { ...state, showFavoriteDogMatched: action.payload }
    case SearchActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload }
    case SearchActionTypes.SET_TOTAL:
      return { ...state, total: action.payload }
    case SearchActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }
    case SearchActionTypes.SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload }
    default:
      return state
  }
}

export default function SearchPage() {

  const [state, dispatch] = useReducer(searchReducer, initialState)
  const { redirectToLogin } = useApiErrorHandlers()
  
  const actions: SearchActions = {
    toggleFilterOptions: (value: boolean) => dispatch({ type: SearchActionTypes.TOGGLE_FILTER_OPTIONS, payload: value }),
    toggleFavoriteDogMatched: (value: boolean) => dispatch({ type: SearchActionTypes.TOGGLE_FAVORITE_DOG_MATCHED, payload: value }),
    setSearchOptions: (options: SearchOptions) => dispatch({ type: SearchActionTypes.SET_SEARCH_OPTIONS, payload: options }),
    setActivatedSearchOptionsCount: (count: number) => dispatch({ type: SearchActionTypes.SET_ACTIVATED_SEARCH_COUNT, payload: count }),
    toggleFavorite: (dogId: string) => dispatch({ type: SearchActionTypes.TOGGLE_FAVORITE, payload: dogId }),
    setMatchedDogs: (dogs: Dog[] ) => dispatch({ type: SearchActionTypes.SET_MATCHED_DOGS, payload: dogs }),
    setFavoriteDogMatched: (dog: Dog) => dispatch({ type: SearchActionTypes.SET_FAVORITE_DOG_MATCHED, payload: dog }),
    setIsLoading: (value: boolean) => dispatch({ type: SearchActionTypes.SET_LOADING, payload: value }),
    setTotal: (value: number) => dispatch({ type: SearchActionTypes.SET_TOTAL, payload: value }),
    setCurrentPage: (value: number) => dispatch({ type: SearchActionTypes.SET_CURRENT_PAGE, payload: value }),
    setPageSize: (value: number) => dispatch({ type: SearchActionTypes.SET_PAGE_SIZE, payload: value }),
  }
  
  return (
    <SearchContext.Provider value={{ state, actions, redirectToLogin }}>
      <Search />
    </SearchContext.Provider>
  )
}

export function Search() {
  
  const { state, actions, redirectToLogin } = useSearchContext()

  useEffect(() => {
    // return
    actions.setIsLoading(true)

    let dogsFetcher; 
    if (state.searchOptions.favoritesOnly) {
      // load favorites only
      dogsFetcher = details([...state.favorites])
        .then(dogs => {
          actions.setTotal(dogs.length)
          actions.setMatchedDogs(dogs)
        })
    } else {
      dogsFetcher = search(state.searchOptions)
        .then((result) => {
          actions.setTotal(result.total)
          return details(result.resultIds)
        })
        .then(actions.setMatchedDogs)
    }

    dogsFetcher
      .catch(redirectToLogin)
      .finally(() => {
        actions.setIsLoading(false)
        window.scrollTo({ top: 0 });
      })

  }, [ state.searchOptions ])
  
  return (
    <div className={`flex flex-col justify-start px-3 xl:px-20 ${state.showFilterOptions ? 'h-screen overflow-hidden' : ''}`}>
      <Navigation />
      <FiltersOptions />
      <MainContentSection />
    </div>
  )
}

function Navigation() {
  const { state, actions, redirectToLogin } = useSearchContext()

  const {
    favorites,
    activatedSearchOptionsCount,
  } = state

  const handleFilterOptions = () => {
    actions.toggleFilterOptions(true)
  }

  const handleMatchFavoriteDogs = () => {
    actions.setIsLoading(true)
    match([...state.favorites])
      .then(({ match }) => details([ match ]))
      .then(([dog]) => {
        actions.setFavoriteDogMatched(dog)
        actions.toggleFavoriteDogMatched(true)
      })
      .catch(redirectToLogin)
      .finally(() => actions.setIsLoading(false))
  }

  return (
    <div className="sticky top-0 z-10 flex justify-between items-center bg-white py-3">
      <Logo className="size-14"/>
      <div className="flex gap-3">
        {favorites.size > 0 && <FavoritesButton title={favorites.size.toString()} onClick={handleMatchFavoriteDogs}/> }
        <FilterButton onClick={handleFilterOptions} active={activatedSearchOptionsCount} />
      </div>
    </div>
  )  
}

function FiltersOptions() {
  const { state, actions } = useSearchContext()
  const {
    showFilterOptions,
    searchOptions,
  } = state

  const handleApplyFilters = (filters: SearchOptions, activatedCount: number) => {
    actions.toggleFilterOptions(false)
    actions.setSearchOptions(filters)
    actions.setCurrentPage(1)
    actions.setActivatedSearchOptionsCount(activatedCount)
    actions.toggleFavoriteDogMatched(false)
  }

  if (!showFilterOptions) {
    return
  }

  return (
    <FiltersModal
      activeFilters={searchOptions}
      onApplyFilters={handleApplyFilters}
      onClose={() => actions.toggleFilterOptions(false)}
    /> 
  )
}

function MainContentSection() {
  const { state } = useSearchContext()
  const {
    isLoading,
    showFavoriteDogMatched,
  } = state

  if (isLoading) {
    return <><LoadingPlaceholder /><Loader /></>
  }

  if (showFavoriteDogMatched) {
    return <FavoriteDogGreeting />
  }

  return (
    <>
      <SearchResults />
      <Pagination />
      <NoResults />
    </>
  )
}

function SearchResults() {
  const { state, actions } = useSearchContext()
  const {
    matchedDogs,
    favorites,
  } = state

  if (matchedDogs.length == 0) {
    return;
  }

  console.log(favorites)

  const handleFavorite = (dog: Dog) => {
    actions.toggleFavorite(dog.id)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-10">
      {matchedDogs.map(dog => 
        <div key={dog.id} className="relative">
          <DogCard dog={dog} />
          <span 
            onClick={() => handleFavorite(dog)}
            className="absolute right-0 top-0 w-14 h-14 p-2 cursor-pointer">
            <FavoriteBadge active={favorites.has(dog.id)} />
          </span>
        </div>
      )}
    </div>
  )  
}

function Pagination() {
  const { state, actions } = useSearchContext()
  const {
    total,
    pageSize,
    searchOptions,
    currentPage,
  } = state


  if (total <= pageSize || searchOptions.favoritesOnly) {
    return
  }

  const handlePage = (page: number, from: number) => {
    actions.setCurrentPage(page)
    actions.setSearchOptions({...searchOptions, from, size: pageSize })
  }

  return (
    <div className="sticky bottom-0 bg-white py-3">
      <Paginator total={total} size={pageSize} current={currentPage} onPage={handlePage}/>
    </div>
  )
}

function NoResults() {
  const { state: { matchedDogs } } = useSearchContext()
  if (matchedDogs.length > 0) {
    return
  }

  return (
    <div className="w-full h-full mt-30">
      <NoSearchResults>
        <span className="text-2xl font-bold text-cyan-900">Hmm... no dogs fit your search</span>
        Try a different breed or explore more options!
      </NoSearchResults>
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-10">
      {[...Array(10)].map((_, idx) => 
        <div key={idx} className="w-full aspect-square bg-gray-200 rounded-xl" />
      )}
    </div>
  )  
}

function FavoriteDogGreeting() {
  const { state } = useSearchContext()

  return (
    <div className="flex flex-col justify-center items-center">
      <span className="block text-3xl sm:text-5xl text-center m-10 text-amber-600">
        <b>Woohoo!</b> We've matched you with a wonderful pup!
      </span>
      <div className="w-full sm:w-1/4">
        <DogCard dog={state.favoriteDogMatched as Dog} />
      </div>
    </div>
  )
}