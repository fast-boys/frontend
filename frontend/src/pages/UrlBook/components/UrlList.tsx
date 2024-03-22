// src/UrlBook/components/UrlList.tsx

import UrlItem from './UrlItem';
import { useUrlStore } from '../store';
import TravelBus from '../../../assets/lottie/TravelBus.json'
import Lottie from 'react-lottie';

const UrlList: React.FC = () => {
  const urls = useUrlStore((state) => state.urls);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: TravelBus, // Lottie 애니메이션 데이터
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      {urls.length > 0 ? (
        urls.map((url, index) => <UrlItem key={index} index={index} {...url} />)
      ) : (
        <div className="text-center">
          <Lottie options={defaultOptions} height={300} width={300} />
          <h1 className="text-xl font-bold">삐뽀삐뽀 URL 추가 요망</h1>
        </div>
      )}
    </div>
  );
};

export default UrlList;
