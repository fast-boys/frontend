import { useInfiniteSearchResult } from '../query'
import { useSearchedTextStore } from '../store'
import SearchResultItem from './SearchResultItem'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import NoSearchResult from './NoSearchResult'

const SearchResultList = () => {
	const { searchedText } = useSearchedTextStore()

	const { ref: lastElementRef, inView: lastElementInView } = useInView()
	const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
		useInfiniteSearchResult(searchedText)

	useEffect(() => {
		if (lastElementInView) {
			fetchNextPage()
		}
	}, [data, fetchNextPage])

	if (isError || isLoading) {
		return <></>
	}

	return (
		<>
			{data ? (
				<ul className="flex flex-col gap-6 py-6 mt-16">
					{data.map((locationInfo) => (
						<li
							key={locationInfo.spot_id}
							ref={lastElementRef}
							className="flex items-center justify-between"
						>
							<SearchResultItem resultItem={locationInfo} />
						</li>
					))}
				</ul>
			) : (
				<NoSearchResult />
			)}
			{isFetchingNextPage && <>loading...</>}
		</>
	)
}

export default SearchResultList
