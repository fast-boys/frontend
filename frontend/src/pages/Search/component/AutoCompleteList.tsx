import { useAutoCompleteResultStore } from '../store'
import SearchResultItem from './SearchResultItem'

const SearchResultList = () => {
	const { autoCompleteResult } = useAutoCompleteResultStore()

	return (
		<ul className="flex flex-col gap-6 py-6 mt-16">
			{autoCompleteResult.map((locationInfo) => (
				<SearchResultItem
					key={locationInfo.spot_id}
					resultItem={locationInfo}
				/>
			))}
		</ul>
	)
}

export default SearchResultList
