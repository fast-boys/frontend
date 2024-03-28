// src/pages/Chat/components/ChatList.tsx

import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store'
import ChatMessage from './ChatMessage';
import { useWebSocketConnect } from '../socket';


const ChatList: React.FC = () => {
	const messages = useChatStore((state) => state.messages)
	const chatListRef = useRef<HTMLDivElement>(null)

	useWebSocketConnect(); // WebSocket 연결 사용

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


    // useEffect(() => {
    //     const fetchRecentMessages = async () => {
    //         // 예시 URL, 실제 API 주소로 변경해야 합니다.
    //         const response = await fetch('http://192.168.100.167:8082/chat/recent?plan=1');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // 서버에서 받은 데이터를 상태에 추가합니다.
    //             data.forEach((message: ChatMessageType) => {
    //                 useChatStore.getState().addMessage(message.userId, message.content, message.type);
    //             });
    //         }
    //     };

    //     fetchRecentMessages();
    // }, []);


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
