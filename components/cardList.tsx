'use client'

import { useQuery } from "@tanstack/react-query";
import ImageCard from "./imageCard"
import { SearchFiles } from "@/actions/storageActions";
import { Skeleton } from "@/components/ui/skeleton";

function CardListSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-lg bg-card">
          {/* Image area */}
          <div className="p-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
          </div>
          {/* Footer area */}
          <div className="px-4 py-2">
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      ))}
    </>
  )
}

export default function CardList( { searchInput } ) {
    const searchImageQuery = useQuery({
        queryKey: ['images', searchInput],
        queryFn: async () => SearchFiles(searchInput)        
    });    

    return (
        <>
            {searchImageQuery.data && searchImageQuery.data.length === 0 && 
                <p className="flex w-full h-64 items-center justify-center text-gray-500">이미지를 찾을 수 없습니다.</p>
            }
            <section className="w-full grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4">
                {searchImageQuery.isLoading && <CardListSkeleton/>}                
                {searchImageQuery.data?.map(image => <ImageCard key={image.id} image={image} /> )}
            </section>
        </>
    );
}
