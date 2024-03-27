// src/pages/Chat/store.ts

import { create } from 'zustand'
import { ChatMessageType, chatDummyData } from './dummy/ChatDummyData'
import SocketMock from 'socket.io-mock'

const socket = new SocketMock()
interface ChatStore {
	messages: ChatMessageType[] // messages의 타입을 chatDummyData의 타입으로 설정합니다.
	addMessage: (userId: string, content: string, type?: string) => void // type은 선택적으로. 생략 가능
	deleteMessage: (id: number) => void
}

//수정: utils에 넣어도되나요?
//수정: 날짜별로 채팅 나누기 ?
const getTimeStamp = (): string => {
	return new Date().toString()
}

export const useChatStore = create<ChatStore>((set) => ({
	messages: chatDummyData,
	addMessage: (userId, content, type = 'text') =>
		set((state) => {

			// 로그인중인 유저 getCurrentUser 대신
			// const currentuser = { nickname: 'user', profileImage: 'NoImage.png' }

			const newMessage = {
				id: state.messages.length + 1,
				user: {
					userId,
					nickname: 'User', //수정: 실제 사용 시 서버에서 가져온 값을 사용
					profileImage: 'default.jpg', // 실제 사용 시 서버에서 가져온 값을 사용
				},
				content,
				timestamp: getTimeStamp(),
				type,
			}
			// 새 메시지를 상태에 추가하고, 소켓을 통해 전송합니다.
			socket.socketClient.emit('message', newMessage)
			return {
				messages: [...state.messages, newMessage],
			}
		}),
	deleteMessage: (id) =>
		set((state) => ({
			messages: state.messages.filter((message) => message.id !== id),
		})),
}))
