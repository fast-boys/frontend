// src/pages/UrlBook/store.ts
import { create } from 'zustand'
import { UrlStore } from './types'

export const useUrlStore = create<UrlStore>((set) => ({
	urls: [], // types.ts에서 타입 선언해놨습니다~
	completed_urls: [], // SSE로 확인하고 status:true가 된urls 저장하고싶어요~

	setUrls: (newUrls) => {
		set(() => ({ urls: newUrls }))
	},

	addCompletedUrl: (urlItem) => {
		set((state) => ({
			completed_urls: [...state.completed_urls, urlItem],
		}))
	},

	toggleCheck: (index) => {
		set((state) => ({
			urls: state.urls.map((url, i) =>
				i === index ? { ...url, checked: !url.checked } : url
			),
		}))
	},

	selectAllUrls: () => {
		set((state) => ({
			urls: state.urls.map((url) => ({ ...url, checked: true })),
		}))
	},
	
	unSelectAllUrls: () => {
		set((state) => ({
			urls: state.urls.map((url) => ({ ...url, checked: false })),
		}))
	},
}))

