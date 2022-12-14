import Avatar from '@mui/material/Avatar'
import { CommentUser, CommentWrite } from './PostComment.style'
import { useState } from 'react'
import PostReplyWrite from './PostReplyWrite'
import { apiInstance } from '../../../../apis/setting'
import { toast } from 'react-toastify'

const PostSingleComment = (props) => {
    const [openReply, setOpenReply] = useState(false)
    const { comment, accessToken, idx, nickname, refreshFunction, clickView, userIdx } = props
    const [modify, setModify] = useState(false)
    const [setting, clickSetting] = useState(false)
    const [modifyComment, setModifyComment] = useState(comment.comment)
    const deleteComment = '삭제된 댓글입니다.'
    const [deleteState, setDeleteState] = useState(false)

    const handleSetting = () => clickSetting(!setting)
    const clickReply = () => {
        setOpenReply(!openReply)
    }
    const clickModify = async () => {
        try {
            const getResponse = await apiInstance.put('/community/comment', { idx: comment.idx, comment: modifyComment })
            console.log('modi', getResponse.data)
            toast.success('수정 완료')
            setModify(false)
        } catch (e) {
            console.error(e.response)
        }
    }
    const handleChange = (e) => {
        setModifyComment(e.target.value)
    }
    const handleModify = () => {
        setModify(!modify)
    }
    const clickDelete = async (e) => {
        try {
            if (confirm('정말로 삭제하시겠습니까?') === true) {
                alert('삭제되었습니다.')
                setDeleteState(true)
            }
            const getResponse = await apiInstance.put('/community/comment', { idx: comment.idx, comment: deleteComment })
        } catch (e) {
            console.error(e.response)
        }
    }
    return (
        <>
            {!modify ? (
                !deleteState ? (
                    <>
                        <CommentUser>
                            <div>
                                <Avatar alt='User Image' src='/topgun.jpeg' />
                                <div>
                                    <div>{nickname}</div>
                                    <div>{modifyComment}</div>
                                    <button onClick={clickReply}>Reply to</button>
                                </div>
                            </div>
                            <div>
                                <button onClick={handleModify}>수정하기</button>
                                <button onClick={clickDelete}>삭제하기</button>
                            </div>
                        </CommentUser>
                    </>
                ) : (
                    <div>{deleteComment}</div>
                )
            ) : (
                <CommentWrite>
                    <textarea value={modifyComment} onChange={handleChange} placeholder='댓글 작성해주세요!'></textarea>
                    <div>
                        <button onClick={handleModify}>취소하기</button>
                        <button onClick={clickModify}>수정하기</button>
                    </div>
                </CommentWrite>
            )}
            {openReply && (
                <PostReplyWrite
                    clickReply={clickReply}
                    refreshFunction={refreshFunction}
                    reply={comment?.idx}
                    accessToken={accessToken}
                    contentIdx={idx}
                    nickname={nickname}
                    clickView={clickView}
                    userIdx={userIdx}
                />
            )}
        </>
    )
}

export default PostSingleComment
