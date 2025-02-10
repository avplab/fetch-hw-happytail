import { SearchOptions } from "@/types";
import { fetchApiGet, fetchApiPost } from "./http";

export function search(options: SearchOptions) {
  const params = new URLSearchParams()
  
  if (options.breeds) {
    options.breeds.forEach(breed => params.append('breeds', breed))
  }
  if (options.ageMin) {
    params.append('ageMin', options.ageMin.toString())
  }
  if (options.ageMax) {
    params.append('ageMax', options.ageMax.toString())
  }
  if (options.sort) {
    params.append('sort', `${options.sort.field}:${options.sort.order ? 'desc': 'asc'}`)
  }
  if (options.from) {
    params.append('from', options.from.toString())
  }
  if (options.size) {
    params.append('size', options.size.toString())
  }

  return fetchApiGet(['/dogs/search', params.toString()].join('?'))
}

// export function navigate(pageUrl: string) {
//   return fetchApiGet(pageUrl)
// }

export function details(dogIds: string[]) {
  return fetchApiPost('/dogs', dogIds)
}

export function breeds() {
  return fetchApiGet('/dogs/breeds')
}

export function match(dogIds: string[]) {
  return fetchApiPost('/dogs/match', dogIds)
}