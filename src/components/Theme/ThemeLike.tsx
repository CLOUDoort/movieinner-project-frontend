import { apiInstance } from '../../apis/setting'
import { toast } from 'react-toastify'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ThemeLikeBtn } from './Theme.style'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'

const ThemeLike = (props) => {
    const accessToken = useSelector((state: RootState) => state.token.token)
    const userIdx = useSelector((state: RootState) => state.idx.idx)
    const [like, setLike] = useState(false)
    const { modalInfo } = props

    useEffect(() => {
        const getResponse = async () => {
            try {
                if (accessToken) {
                    const checkLiked = await apiInstance.post('movies/liked/theme', {
                        userIdx: userIdx,
                        name: modalInfo[0].theme_name,
                    })
                    if (checkLiked.data.isExisted) {
                        setLike(true)
                    }
                }
            } catch (e) {
                console.error(e.response)
            }
        }
        getResponse()
    }, [accessToken])

    const clickLikeBtn = async () => {
        if (accessToken) {
            // 좋아요 삭제
            if (like) {
                try {
                    const deleteResponse = await apiInstance.delete('movies/liked', {
                        data: {
                            type: 'theme',
                            userIdx: userIdx,
                            name: modalInfo[0].theme_name,
                        },
                    })
                    setLike(false)
                    toast.success('좋아요 삭제!')
                } catch (e) {
                    console.error(e.response)
                }
            } else {
                // 좋아요 추가
                try {
                    const clickLikeResponse = await apiInstance.post('movies/liked', {
                        type: 'theme',
                        userIdx: userIdx,
                        name: modalInfo[0].theme_name,
                        backdrop_path: modalInfo[0].backdrop_path,
                    })
                    setLike(true)
                    toast.success('좋아요! 마이페이지에 담김')
                } catch (e) {
                    console.error(e.response)
                }
            }
        } else {
            toast.error('로그인 해주세요!')
        }
    }

    return (
        <ThemeLikeBtn like={like} onClick={clickLikeBtn}>
            <BsFillHandThumbsUpFill size={30} />
        </ThemeLikeBtn>
    )
}

export default ThemeLike
