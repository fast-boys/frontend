import { useState } from 'react'
import { isValidImageFile } from '../../pages/MyPage/util'
import { useUserProfileImage } from '../../pages/MyPage/hooks/useUserProfileImage'

interface EditProfileImageProps {
	type: 'user' | 'travel'
	currentUserProfileUrl: string | null
}

const EditProfileImage = ({
	type,
	currentUserProfileUrl,
}: EditProfileImageProps) => {
	const [imageFile, setImageFile] = useState<File | null>(null) // 서버 전송용 imageFile
	const profileUrl = useUserProfileImage(imageFile, currentUserProfileUrl)

	const handleChangeImageFile = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const fileInput = event.currentTarget
		const selectedFile = (fileInput.files as FileList)[0]

		if (!isValidImageFile(selectedFile)) {
			return
		}

		setImageFile(selectedFile)
	}

	return (
		<label className="self-center">
			<img
				src={
					profileUrl
						? profileUrl
						: type === 'user'
						? '/src/assets/svgs/defaultProfile.svg'
						: '/src/assets/svgs/defaultLocation.svg'
				}
				alt="프로필 이미지"
				className="w-20 h-20 rounded-full"
			/>
			<input
				type="file"
				name="profileImage"
				id=""
				onChange={handleChangeImageFile}
				className="hidden"
			/>
		</label>
	)
}

export default EditProfileImage