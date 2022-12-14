import { UserProfileBox, UserProfileContainer } from "./Signupinfo.style"
import Image from "next/image"
import { CheckText } from "./Signup.style"
import { useEffect, useRef, useState } from "react"
import { apiInstance } from "../../../apis/setting"
import { setUser } from "../../../store/reducers/signupSlice"
import { toast } from "react-toastify"

// 닉네임, 이미지 입력
const SignupUserProfile = (props) => {
    const { info, handleChange, dispatch } = props
    // 닉네임 중복 여부
    const [checkNickname, setCheckNickname] = useState({
        click: false,
        valid: false,
    })
    useEffect(() => {
        const check = async () => {
            try {
                const response = await apiInstance.post('/users/check/nickname', { nickname: info.nickname })
                if (!response.data.isNicknameExisted)
                    setCheckNickname({
                        ...checkNickname,
                        valid: true,
                    })
                else
                    setCheckNickname({
                        ...checkNickname,
                        valid: false,
                    })
            } catch (e) {
                setCheckNickname({
                    ...checkNickname,
                    valid: false,
                })
            }
        }
        check()
    }, [info.nickname])

    // profile_img
    const [image, setImage] = useState('/blank.png')
    const fileInput = useRef(null)
    const handleImage = async (e: any) => {
        const file = e.target.files[0]
        if (!file) return

        // 이미지 화면에 띄우기
        const reader = new FileReader()
        reader.readAsDataURL(file) // 파일에서 불러오는 메서드 / 종료되는 시점에 readyState는 Done(2)가 되고 onload 시작
        reader.onload = (e: any) => {
            if (reader.readyState === 2) {
                // 파일 읽는 것이 성공했을 때, 2 반환 / 진행 중은 1, 실패는 0
                setImage(e.target.result)
            }
        }

        // 이미지 s3에 보내고 url 받기
        const formData = new FormData()
        formData.append('image', file)
        try {
            const imageRes = await apiInstance.post('/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            const image_URL = imageRes.data.imageURL
            console.log(image_URL)
            dispatch(setUser({ key: 'image_URL', value: image_URL }))
            toast.success('success')
        } catch (e) {
            console.log(e)
            toast.error('error')
        }
        // await apiInstatnce.delete('/image', {params: {imageName: ''}}) 이미지 삭제
    }

    return (
        <UserProfileContainer>
            <a
                href='#'
                onClick={() => {
                    fileInput.current.click()
                }}
            >
                <Image src={image} width={150} height={150} alt='프로필 이미지입니다.' />
            </a>
            <UserProfileBox>
                <input
                    type='text'
                    placeholder='닉네임을 입력하세요'
                    name='nickname'
                    value={info.nickname}
                    onChange={handleChange}
                    autoComplete='off'
                    onFocus={() => {
                        setCheckNickname({ ...checkNickname, click: true })
                    }}
                />
                {checkNickname.click &&
                    info.nickname.length > 0 &&
                    (checkNickname.valid ? <CheckText check={true}>사용 가능한 닉네임입니다.</CheckText> : <CheckText check={false}>중복된 닉네임입니다.</CheckText>)}
                <label htmlFor='input-file'>이미지 선택</label>
                <input type='file' name='image_URL' id='input-file' accept='image/*' style={{ display: 'none' }} ref={fileInput} onChange={handleImage} />
            </UserProfileBox>
        </UserProfileContainer>
    )
}

export default SignupUserProfile