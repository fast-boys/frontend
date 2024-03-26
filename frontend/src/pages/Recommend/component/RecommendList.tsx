// import { useRecommendListQuery} from '../query'

import { useEffect } from 'react'
import { useRecommendListQueries } from '../query'

// Todo: 이미지 최적화 작업 필요
// - 이미지가 느리게 받아와지는 문제 때문에 이미지 최적화 작업이 필요하다.
const RecommendList = () => {
	// :: Queries version
	const { recommendListWithImage } = useRecommendListQueries()
	useEffect(() => {
		console.log('final data', recommendListWithImage)
	}, [recommendListWithImage])

	return (
		<ul className="grid grid-cols-4 gap-2 pt-8 pb-24">
			{recommendListWithImage.map((location, index) => (
				<li key={`recommend-${index}`}>
					<img
						src={location.image}
						alt={`${location.name}의 이미지`}
						className="w-full rounded"
					/>
				</li>
			))}
		</ul>
	)
}

export default RecommendList
