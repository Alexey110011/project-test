import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query'
import type { UseInfiniteQueryOptions } from '@tanstack/react-query'
import { fetchTotal, fetchProducts, fetchLazyForMobile } from './fetches.ts'
import type { ProductType } from '../types/types.ts'

export const useFetchTotal = () => {
    return useQuery({
        queryKey: ['total'],
        queryFn: fetchTotal
    })
}

export const useFetchProducts = (page: number, itemsPerPage: number,  options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['productsDesktop', page, itemsPerPage],
        queryFn: () => fetchProducts(page, itemsPerPage),
        placeholderData: keepPreviousData,
        enabled: options?.enabled ?? true
       
    })
}

export const useInfiniteFetchProducts = (itemsPerPage: number, options?: Pick<
    UseInfiniteQueryOptions<ProductType[], Error>,
    'enabled'
  >) => {
    return useInfiniteQuery<ProductType[], Error>({
        queryKey: ['productsMobile', itemsPerPage],
        queryFn: async({pageParam})=> { 
            const pageNumber = typeof pageParam === 'number' ? pageParam : 1;
            return fetchLazyForMobile(pageNumber, itemsPerPage)
        },
        getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === itemsPerPage ? allPages.length + 1 : undefined
    },
   initialPageParam:1,
   enabled: options?.enabled ?? true
  })
}