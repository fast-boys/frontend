// src/pages/UrlBook/components/UrlResult.tsx

import { useEffect, useState } from 'react';
import { fetchUrlResults, UrlDummyResult, PlaceInfo } from 'src/pages/UrlBook/dummyData/urlDummyResult';
import { Link } from 'react-router-dom'; // react-router-dom에서 Link 가져오기

const UrlResult = () => {
  const [urlData, setUrlData] = useState<UrlDummyResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUrlResults();
      setUrlData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg overflow-hidden mr-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3"> {/* 'Back To Url' 버튼 추가 */}
          <h2 className="text-xl tex font-bold">FASTRAVEL'S PICK</h2>
          <Link to="/urlbook" className="text-sm text-blue-500 hover:underline">Back To Url</Link>
        </div>
        {urlData && Object.entries(urlData).map(([urlKey, places], sectionIndex) => (
          <div key={sectionIndex} className="mb-2">
            <h3 className="text-lg font-semibold mb-3">{urlKey.replace('URL', 'URL ')}</h3>
            <div className="flex pb-12 overflow-x-auto">
              {places.map((place: PlaceInfo, index: number) => (
                <div key={index} className="flex-shrink-0 w-24 h-24 mr-4">
                  {place.img ? (
                    <img src={place.img} alt={place.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <img src="https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif" alt={place.name} className="w-full h-full object-cover rounded-lg" />
                  )}                  
                  <div className="mt-2 text-sm font-semibold line-clamp-1">{place.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-1">{place.address}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlResult;
