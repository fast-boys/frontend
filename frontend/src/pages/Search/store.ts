import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// :: Search Location Text
interface IAutoCompleteTextStore {
	autoCompleteText: string
	setAutoCompleteText: (text: string) => void
}
export const useAutoCompleteTextStore = create<IAutoCompleteTextStore>()(
	devtools((set) => ({
		autoCompleteText: '',
		setAutoCompleteText: (text: string) =>
			set(() => ({ autoCompleteText: text })),
	}))
)

interface ISearchedTextStore {
	searchedText: string
	setSearchedText: (text: string) => void
}
export const useSearchedTextStore = create<ISearchedTextStore>()(
	devtools((set) => ({
		searchedText: '',
		setSearchedText: (text: string) => set(() => ({ searchedText: text })),
	}))
)

// :: Search Location Result
// - 검색 결과를 받아오는 store
// - 이 정보를 이용해서 클릭했을 때 해당 지역들을 지도에 표시할 수 있어야 한다.
interface IAutoCompleteResultStore {
	autoCompleteResult: SearchLocationInfo[]
	setAutoCompleteResult: (result: SearchLocationInfo[]) => void
}

export const useAutoCompleteResultStore = create<IAutoCompleteResultStore>()(
	devtools((set) => ({
		autoCompleteResult: [],
		setAutoCompleteResult: (result: SearchLocationInfo[]) =>
			set(() => ({ autoCompleteResult: result })),
	}))
)

interface ISearchResultStore {
	searchResult: SearchLocationInfo[]
	setSearchResult: (result: SearchLocationInfo[]) => void
}

export const useSearchResultStore = create<ISearchResultStore>()(
	devtools((set) => ({
		searchResult: [],
		setSearchResult: (result: SearchLocationInfo[]) =>
			set(() => ({ searchResult: result })),
	}))
)
