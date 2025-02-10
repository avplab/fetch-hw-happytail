import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { memo } from "react";

export interface PaginatorProps {
  total: number;
  size: number;
  current: number;
  onPage: (page: number, offset: number) => void;
}

export default memo(({ total, size = 25, current = 0, onPage }: PaginatorProps) => {
  
  const visiblePages = 5

  const totalPages = Math.ceil(total / size);
  let pageStart = Math.max(0, current - 1 - Math.floor(visiblePages / 2));
  const pageEnd = Math.min(totalPages, pageStart + visiblePages);
  
  if (pageEnd - pageStart < visiblePages) {
    pageStart = Math.max(0, pageEnd - visiblePages);
  }
  
  const pages = [...Array(pageEnd - pageStart)].map((_, idx) => idx + pageStart + 1 )

  const handlePage = (page: number) => {
    if (current !== page) {
      onPage(page, (page - 1) * size)
    }
  }

  return (
    <div className="flex justify-center gap-2">
      <div className="flex-1 flex justify-end">
        { current > 1 &&
          <Button 
            onClick={() => handlePage(current - 1)}
            className="w-10 sm:w-24 h-10! border-1 border-gray-200! hover:border-black! active:border-black!"
          >
            <Icon name="chevron_backward" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        }
      </div>

      <div className="flex flex-col justify-center items-center w-1/3 sm:hidden">
        <span>{Math.max((current - 1) * size, 1)} - {current * size}</span>
      </div>
      <div className="sm:flex justify-center gap-1 hidden">
        {pages.map((page) => 
          <Button 
            key={page} 
            onClick={() => handlePage(page)}
            className={`w-14 h-10! border-1 border-gray-200 rounded-full! ${page === current ? 'border-black! border-2' : ''}`}
          >{page}</Button>
        )}
      </div>
      <div className="flex-1 flex justify-start">
        { current < totalPages &&
          <Button 
            onClick={() => handlePage(current + 1)}
            className="w-10 sm:w-24 h-10! border-1 border-gray-200! hover:border-black! active:border-black!"
          >
            <span className="hidden sm:inline">Next</span>
            <Icon name="chevron_forward" />
          </Button>
        }
      </div>
    </div>
  )
})