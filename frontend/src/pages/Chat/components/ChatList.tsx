// src/pages/Chat/components/ChatList.tsx

import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store'
import ChatMessage from './ChatMessage'

const ChatList: React.FC = () => {
	const messages = useChatStore((state) => state.messages)
	const chatListRef = useRef<HTMLDivElement>(null) // 채팅 리스트를 위한 ref

	//수정: 메시지 목록이 변경될 때마다 실행
	// 사진 보내면 로딩되기 전에 이동하려고 해서 상단만 보임
	// 텀 두면 되긴 하는데 자연스럽지 않구만..
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
