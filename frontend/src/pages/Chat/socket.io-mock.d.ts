// src/pages/Chat/socket.io-mock.d.ts
declare module 'socket.io-mock' {
	import { Socket } from 'socket.io-client'

	export default class SocketMock {
		socketClient: Socket
		emit(event: string, ...args: any[]): void
		on(event: string, callback: (...args: any[]) => void): void
		// 필요한 경우 여기에 추가 메소드를 선언할 수 있습니다.
	}
}
