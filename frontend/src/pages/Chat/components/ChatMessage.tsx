// src/pages/Chat/components/ChatMessage.tsx

import React from 'react'
import { ChatMessageType } from '../dummy/ChatDummyData';

interface ChatMessageProps {
	message: ChatMessageType
	previousMessage: ChatMessageType | null
	nextMessage: ChatMessageType | null
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	message,
	previousMessage,
	nextMessage,
}) => {
	const formatTimeForComparison = (timestamp: string): string => {
		const date = new Date(timestamp)
		const days = date.getDay()
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const ampm = hours >= 12 ? '오후' : '오전'
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
		return `${days} ${ampm} ${formattedHours}:${formattedMinutes}`
	}

	const isUserMessage = message.user.nickname === 'User'

	// 이전 메시지와 다음 메시지가 같은 사용자에 의해 보내졌는지 확인
	const isPreviousSameUser =
		previousMessage && previousMessage.user.nickname === message.user.nickname

	// 다음 메시지가 같은 사용자에 의해 같은 시간에 보내졌는지 확인
	const isNextSameUserAndTime =
		nextMessage &&
		nextMessage.user.nickname === message.user.nickname &&
		formatTimeForComparison(nextMessage.timestamp) ===
			formatTimeForComparison(message.timestamp)

	// 닉네임과 시간 표시 여부 결정
	const showNickname = !isUserMessage && !isPreviousSameUser
	// 다음 메시지가 같은 시간에 같은 사용자에 의해 보내졌는 경우를 제외하고 시간 표시
	const showTime = !isNextSameUserAndTime


	const formatTime = (timestamp: string): string => {
		const date = new Date(timestamp)
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const ampm = hours >= 12 ? '오후' : '오전'
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
		return `${ampm} ${formattedHours}:${formattedMinutes}`
	}

	//수정: userMypageUrl 고쳐야 합니다 ~~~!
	const userMyPageUrl = `https://mypage/${message.user.userId}`
	const profileImagePath = `src/assets/profileImage/${message.user.profileImage}`

	return (
		<div
			className={`flex ${
				isUserMessage ? 'flex-row-reverse' : 'flex-row'
			} items-end px-2 py-1 w-full`}
		>
			<div
				className={`flex flex-col ${
					isUserMessage ? 'items-end' : 'items-start'
				} w-full`}
			>
				{showNickname && (
					<div className="flex items-center mt-2">
						<a href={userMyPageUrl} target="_blank" rel="noopener noreferrer">
							<img
								src={profileImagePath}
								alt={`${message.user.nickname}'s profile`}
								className="w-10 h-10 rounded-xl mb-2 mr-2"
							/>
						</a>
						<div className="text-sm text-gray-600 mt-3">{message.user.nickname}</div>
					</div>
				)}
				<div
					className={`flex ${
						isUserMessage ? 'flex-row-reverse' : ''
					} items-end w-full`}
				>
					{/* 메시지 타입에 따라 텍스트 혹은 이미지를 표시 */}
					{message.type === 'image' ? (
						// 이미지 메시지인 경우 이미지 태그를 사용하여 표시
						<img
							src={message.content}
							alt="Uploaded"
							className="max-w-60 h-auto rounded-lg"
						/>
					) : (
						// 텍스트 메시지인 경우 기존 로직을 유지
						<div
							className={`break-words max-w-64 rounded-lg p-2 shadow ${
								isUserMessage ? 'bg-blue-100' : 'bg-white ml-2'
							}`}
						>
							{message.content}
						</div>
					)}
					{showTime && (
						<div
							className={`text-xs font-light text-gray-400 mx-2 whitespace-no-wrap`}
						>
							{formatTime(message.timestamp)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ChatMessage
