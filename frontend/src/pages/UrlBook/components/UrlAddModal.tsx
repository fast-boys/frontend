// src/pages/UrlBook/components/AddUrlModal.tsx
import React, { useState, useRef, useEffect } from 'react'; // useRef, useEffect 추가
import { useUrlStore } from '../store';

const UrlAddModal: React.FC<{ doCloseModal: () => void }> = ({ doCloseModal }) => {
  // const [memo, setMemo] = useState('');
  const [url, setUrl] = useState(''); // Add this line
  const addUrl = useUrlStore((state) => state.addUrl);
  const [isInvalidUrl, setIsInvalidUrl] = useState(false); // URL 유효성 검사 결과를 저장할 상태 변수 추가


  const urlInputRef = useRef<HTMLTextAreaElement>(null); // textarea 엘리먼트에 대한 참조 생성

  useEffect(() => {
    // 모달이 열릴 때 포커스를 메모 입력창으로 이동
    if (urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, []); // []로 빈 배열을 전달하여 한 번만 실행되도록 설정


  const isValidUrl = (urlString: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // 프로토콜
                               '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // 도메인명
                               '((\\d{1,3}\\.){3}\\d{1,3}))' + // 혹은 ip (v4) 주소
                               '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // 포트와 경로
                               '(\\?[;&a-z\\d%_.~+=-]*)?' + // 쿼리 파라미터
                               '(\\#[-a-z\\d_]*)?$', 'i'); // 해시
    return !!pattern.test(urlString);
  };



  const handleSubmit = () => {
    let formattedUrl = url;
    // URL이 'https://'로 시작하지 않으면 앞에 추가
    if (!formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }
  
    // 수정된 URL이 유효한지 검사
    if (isValidUrl(formattedUrl)) {
      addUrl(formattedUrl); // 유효하면 수정된 URL을 추가
      doCloseModal();
    } else {
      setIsInvalidUrl(true); // 유효하지 않으면 경고 메시지를 표시
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">URL 입력</h3>
          <div className="mt-2 px-7 py-3">
            <textarea
              ref={urlInputRef} 
              className="resize-none border rounded-md w-72 mt-2 text-center"
              placeholder="URL 입력"
              value={url}
              onKeyDown={handleKeyDown}
              rows={1}
              onChange={(e) => {
                setUrl(e.target.value);
                setIsInvalidUrl(false); // 사용자가 입력을 변경하면 경고 메시지를 숨깁니다.
              }}
            />
            {isInvalidUrl && <p className="text-red-500">올바른 URL 주소가 아닙니다.</p>}

          </div>

          <div className='flex justify-center'>
            <div className="items-center px-4 py-3">
              <button
                className="px-4 py-2 bg-green-700 text-white text-base 
                  font-medium rounded-md w-full shadow-sm hover:bg-blue-700 
                  focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>

            <div className="items-center px-4 py-3">
              <button
                className="px-4 py-2 bg-white text-base 
                font-medium rounded-md w-full shadow-sm hover:bg-gray-100 
                focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={doCloseModal}
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UrlAddModal;
