export interface SortOption {
  field: string;
  order: boolean;
}

export interface SearchOptions {
  breeds?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: SortOption;
  from?: number;
  size?: number;
  favoritesOnly?: boolean;
}

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface Match {
  match: string
}

export type SearchState = {
  showFilterOptions: boolean,
  searchOptions: SearchOptions,
  activatedSearchOptionsCount: number,
  favorites: Set<string>,
  matchedDogs: Dog[],
  favoriteDogMatched: Dog | {},
  showFavoriteDogMatched: boolean,
  isLoading: boolean,
  total: number,
  currentPage: number,
  pageSize: number,
}

export interface SearchActions {
  toggleFilterOptions: (value: boolean) => void;
  setSearchOptions: (options: SearchOptions) => void;
  setActivatedSearchOptionsCount: (count: number) => void;
  toggleFavorite: (dogId: string) => void;
  setMatchedDogs: (dogs: Dog[]) => void;
  setFavoriteDogMatched: (dog: Dog) => void;
  toggleFavoriteDogMatched: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setTotal: (value: number) => void;
  setCurrentPage: (value: number) => void;
  setPageSize: (value: number) => void;
}

export interface SearchContextValue {
  state: SearchState;
  actions: SearchActions;
  redirectToLogin: (error: Error) => void;
}

export interface LoginCredentials {
  name: string;
  email: string;
}