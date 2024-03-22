import { useUrlStore } from "../store"

const UrlDeleteBtn = () => {
    const deleteCheckedUrls = useUrlStore((state) => state.deleteCheckedUrls)
    const urls = useUrlStore((state) => state.urls)

    const handleDelete = () => {
        deleteCheckedUrls()
    }

    const countCheckedUrls = () => {
        return urls.filter((url) => url.checked).length;
    };

    const checkedCount = countCheckedUrls();

    return (
        <div>
            <div className="flex justify-between items-center pl-4 pr-4">
                {urls.length === 0 ? ( // URLs 배열의 길이를 체크하여 메시지를 조건부로 렌더링합니다.
                <div></div> // 배열 없을 때 비우려면... ? 이렇게 놔두나 ?
                ) : checkedCount === 0 ? (
                    <div className="text-gray-500">
                        URL을 선택해주세요
                    </div>
                ) : (
                    <div className="text-gray-500">
                        선택 ({checkedCount}) 
                    </div>
                )}
                {checkedCount > 0 && (
                    <button
                        className="text-gray-500 font-medium rounded-md w-24 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={handleDelete}
                    >
                        삭제하기
                    </button>
                )}
            </div>
        </div>
    );
}

export default UrlDeleteBtn
