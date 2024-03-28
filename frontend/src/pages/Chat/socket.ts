// src/pages/Chat/socket.ts

import { useEffect } from 'react'
import { useChatStore } from './store'
import { ChatMessageType } from './dummy/ChatDummyData' // 메시지 타입 임포트

// WebSocket 연결을 설정하는 커스텀 훅
export const useWebSocketConnect = (): void => {
	useEffect(() => {
		const socket = new WebSocket('ws://192.168.100.167:8082/chat?plan=1')

		socket.onopen = (): void => {
			console.log('WebSocket Connected')
			const initData = {
				INTERNAL_ID_HEADER: '8b5b03b7-ae9f-458e-a2b9-558eac541629',
			}
			socket.send(JSON.stringify(initData))
		}

		socket.onmessage = (event): void => {
			console.log('Say do you remember?')
			try {
				const data = JSON.parse(event.data)
				console.log('Received data:', data)

				// 여기에 나머지 로직 추가
				if (data.type === 'text') {
					// 서버에서 받은 초기 채팅 데이터를 처리하여 상태에 추가합니다.
					data.messages.forEach((message: ChatMessageType) => {
						useChatStore
							.getState()
							.addMessage(message.userId, message.content, message.type)
					})
				} else {
					// 일반적인 메시지 처리
					const message: ChatMessageType = data
					useChatStore
						.getState()
						.addMessage(message.userId, message.content, message.type)
				}
			} catch (error) {
				console.error('Error parsing message data:', error)
			}
		}

		socket.onerror = function (event) {
			console.error('WebSocket error observed:', event)
		}

		socket.onclose = (): void => {
			console.log('WebSocket Disconnected')
		}

		return (): void => {
			socket.close()
		}
	}, [])
}
