import { useInfiniteQuery } from '@tanstack/react-query'
import { getSearchedLocation } from './api'
import { useRef } from 'react'

export const useInfiniteSearchResult = (searchText: string) => {
	const pageNum = useRef(0)
	const {
		data,
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['searchResult', searchText],
		queryFn: getSearchedLocation,
		initialPageParam: pageNum.current,
		getNextPageParam: (lastPageInfo) => {
			if (lastPageInfo.length <= 0) return null

			pageNum.current = pageNum.current + 1
			return pageNum.current
		},
		enabled: searchText.length > 0,
	})

	return {
		data,
		isLoading,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	}
}
