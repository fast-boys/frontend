// src/pages/Chat/components/ChatList.tsx

import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store'
import { ChatMessageType } from '../dummy/ChatDummyData'
import socket from '../socketMock'
import ChatMessage from './ChatMessage'

const ChatList: React.FC = () => {
	const messages = useChatStore((state) => state.messages)
	const chatListRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// message는 ChatMessageType 타입입니다.
		const handleNewMessage = (message: ChatMessageType) => {
			// 메시지 추가 함수에 필요한 값만 전달합니다.
			useChatStore
				.getState()
				.addMessage(message.user.userId, message.content, message.type)
		}

		socket.socketClient.on('message', handleNewMessage)

		return () => {
			socket.socketClient.off('message', handleNewMessage)
		}
	}, [])
	
	useEffect(() => {
		if (chatListRef.current) {
			chatListRef.current.scrollTop = chatListRef.current.scrollHeight
			setTimeout(() => {
				if (chatListRef.current) {
					chatListRef.current.scrollTop = chatListRef.current.scrollHeight
				}
			}, 0.0001)
		}
	}, [messages])

	const isDifferentDay = (currentMessageIndex: number): boolean => {
		if (currentMessageIndex === 0) {
			return true
		}
		const currentDate = new Date(messages[currentMessageIndex].timestamp)
		const previousDate = new Date(messages[currentMessageIndex - 1].timestamp)
		return currentDate.getDate() !== previousDate.getDate()
	}

	return (
		<div
			ref={chatListRef}
			className="px-3 overflow-y-auto"
			style={{ height: '520px' }}
		>
			{messages.map((message, index) => (
				<React.Fragment key={message.id}>
					{/* 현재 메시지와 이전 메시지의 날짜가 다른 경우, 날짜 변경선 추가 */}
					{isDifferentDay(index) && (
						<div className="text-center text-gray-500 mt-6 text-sm">
							{new Date(message.timestamp).toLocaleDateString(undefined, {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</div>
					)}
					{/* 채팅 메시지 출력 */}
					<ChatMessage
						message={message}
						previousMessage={index > 0 ? messages[index - 1] : null}
						nextMessage={
							index < messages.length - 1 ? messages[index + 1] : null
						}
					/>
				</React.Fragment>
			))}
		</div>
	)
}

export default ChatList
