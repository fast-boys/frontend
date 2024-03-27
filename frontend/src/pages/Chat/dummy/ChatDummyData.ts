// src/pages/Chat/dummy/ChatDummyData.ts

export interface ChatMessageType {
	id: number
	userId: string
	sender: string
	profileImage: string
	content: string
	timestamp: string
	type: string // 'text', 'image', 'audio' 등이 될 수 있습니다.
}
export const chatDummyData: ChatMessageType[] = [
	{
		id: 1,
		userId: '100001',
		sender: 'User1',
		content:
			'여행을 좋아한다면 추천하는 장소! 여행을 좋아한다면 추천하는 장소! 여행을 좋아한다면 추천하는 장소!',
		profileImage: 'chiikawa.png',
		timestamp: '오후 12:12',
		type: 'text',
	},
	{
		id: 2,
		userId: 'User111111',
		sender: 'User1',
		profileImage: 'chiikawa.png',
		content: '사진을 보여드릴게요.',
		timestamp: '2024-03-24T12:15:00',
		type: 'text',
	},
	{
		id: 3,
		userId: 'User000000',
		sender: 'User',
		profileImage: 'chiikawa.png',
		content: '사진!!',
		timestamp: '2024-03-24T12:16:00',
		type: 'text',
	},
	{
		id: 4,
		sender: 'User000000',
		userId: 'User',
		profileImage: 'chiikawa.png',
		content:
			'사진!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
		timestamp: '2024-03-25T12:16:00',
		type: 'text',
	},
	{
		id: 5,
		userId: 'User111111',
		sender: 'User1',
		profileImage: 'chiikawa.png',
		content: 'src/assets/profileImage/chiikawa.png',
		timestamp: '2024-03-25T12:16:10',
		type: 'image',
	},
	{
		id: 6,
		userId: 'User222222',
		sender: 'User2',
		profileImage: 'hachiware.png',
		content: '아따 마 좋네요.',
		timestamp: '2024-03-26T12:20:00',
		type: 'text',
	},
	{
		id: 7,
		userId: 'User222222',
		sender: 'User2',
		profileImage: 'hachiware.png',
		content: '함',
		timestamp: '2024-03-26T12:20:30',
		type: 'text',
	},
	{
		id: 8,
		userId: 'User222222',
		sender: 'User2',
		profileImage: 'hachiware.png',
		content: '가보겠심다.',
		timestamp: '2024-03-26T12:21:00',
		type: 'text',
	},
	{
		id: 9,
		userId: 'User000000',
		sender: 'User',
		profileImage: 'user.jpg',
		content: 'audio-url-here',
		timestamp: '2024-03-26T12:21:00',
		type: 'audio',
	},
	{
		id: 10,
		userId: 'User000000',
		sender: 'User',
		profileImage: 'User.jpg',
		content: '야이야이야 야이야이야',
		timestamp: '2024-03-26T12:22:00',
		type: 'text',
	},
	{
		id: 11,
		userId: 'User111111',
		sender: 'User1',
		profileImage: 'chiikawa.png',
		content: '꼭 가 당장 가',
		timestamp: '2024-03-26T12:24:00',
		type: 'text',
	},
	{
		id: 12,
		userId: 'User000000',
		sender: 'User',
		profileImage: 'User.jpg',
		content: 'https://m.blog.naver.com/qkrdbwjd1717/221637966057',
		timestamp: '2024-03-26T12:30:00',
		type: 'text',
	},
	{
		id: 13,
		userId: 'User000000',
		sender: 'User',
		profileImage: 'User.jpg',
		content: '텍스트 텍스트',
		timestamp: '2024-03-26T12:31:00',
		type: 'text',
	},
	{
		id: 14,
		userId: 'User000000',
		sender: 'User',
		profileImage: 'User.jpg',
		content:
			'아야야! 아야야! 아야야! 아야야! 아야야! 아야야! 아야야! 아야야! 아야야!',
		timestamp: '2024-03-26T12:31:00',
		type: 'text',
	},
	{
		id: 15,
		userId: 'User111111',
		sender: 'User1',
		profileImage: 'chiikawa.png',
		content: '감사합니당! 가볼게용!',
		timestamp: '2024-03-27T12:31:00',
		type: 'text',
	},
]

export default chatDummyData
