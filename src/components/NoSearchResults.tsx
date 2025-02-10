import { ReactNode } from 'react'
import noSearchResults from '@/assets/no-search-results.webp'

export default function NoSearchResults({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <img src={noSearchResults} className="w-40"/>
      {children}
    </div>
  )
}