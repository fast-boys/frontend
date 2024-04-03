import { useEffect } from 'react'

// BeforeInstallPromptEvent 타입 정의
interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

function HomePage() {
	useEffect(() => {
		let deferredPrompt: BeforeInstallPromptEvent | null = null

		window.addEventListener('beforeinstallprompt', (e) => {
			// 설치 프롬프트가 나타나지 않도록 방지
			e.preventDefault()
			// 이벤트를 나중에 사용하기 위해 저장
			deferredPrompt = e as BeforeInstallPromptEvent
		})

		// 사용자에게 설치 UI를 보여주는 함수
		const showInstallPromotion = () => {
			console.log('설치 프로모션 보여주기')
			// 여기에 사용자에게 설치를 유도하는 UI를 표시하는 코드를 추가하세요.
		}

		showInstallPromotion()

		// 사용자가 설치를 요청할 때 호출될 함수
		const installApp = async () => {
			if (deferredPrompt) {
				deferredPrompt.prompt()
				const { outcome } = await deferredPrompt.userChoice
				if (outcome === 'accepted') {
					console.log('User accepted the install prompt')
				} else {
					console.log('User dismissed the install prompt')
				}
				deferredPrompt = null
			}
		}

		// 예제를 위한 설치 버튼 생성 및 이벤트 리스너 추가
		const installButton = document.createElement('button')
		installButton.textContent = '앱 설치하기'
		installButton.addEventListener('click', installApp)
		document.body.appendChild(installButton)

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener('beforeinstallprompt', (e) =>
				e.preventDefault()
			)
		}
	}, [])

	return (
		<div>
			<h1>Home Page</h1>
			{/* Home 페이지의 나머지 컴포넌트 */}
		</div>
	)
}

export default HomePage
