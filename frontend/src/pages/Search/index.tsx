import SearchHeader from 'src/components/header/SearchHeader'
import DefaultLayout from 'src/components/layout/DefaultLayout'
import { getAutoCompleteLocation } from './api'
import {
	useAutoCompleteResultStore,
	useAutoCompleteTextStore,
	useSearchedTextStore,
} from './store'
import { useCallback } from 'react'
import NoSearchResult from './component/NoSearchResult'
import SearchResultList from './component/SearchResultList'

// Todo: storeSearchedData 부분은 useQuery로 변경 필요
const Search = () => {
	const { autoCompleteResult, setAutoCompleteResult } =
		useAutoCompleteResultStore()
	const { setAutoCompleteText } = useAutoCompleteTextStore()
	const { setSearchedText } = useSearchedTextStore()
	// const { searchResult, setSearchResult } = useSearchResultStore()

	// :: Event Handlers
	const storeSearchedData = useCallback(
		async (searchText: string) => {
			const searchResult = await getAutoCompleteLocation(searchText)
			console.log(searchText, searchResult)
			setAutoCompleteResult(searchResult)
		},
		[autoCompleteResult]
	)

	// const storeSearchResultData = useCallback(
	// 	async (searchText: string) => {
	// 		const searchResult = await getSearchedLocation(searchText)
	// 		console.log(searchText, searchResult)
	// 		setSearchResult(searchResult)
	// 	},
	// 	[searchResult]
	// )

	return (
		<DefaultLayout>
			<SearchHeader
				placeHolder="여행지를 검색해주세요."
				setSearchText={setSearchedText}
				setAutoCompleteText={setAutoCompleteText}
				storeAutoCompleteData={storeSearchedData}
				// storeSearchResultData={storeSearchResultData}
			/>
			{autoCompleteResult.length === 0 ? (
				<NoSearchResult />
			) : (
				<SearchResultList />
			)}
		</DefaultLayout>
	)
}

export default Search
