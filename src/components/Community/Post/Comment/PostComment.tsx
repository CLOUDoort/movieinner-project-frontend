import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import PostRootWrite from './PostRootWrite'
import { CommentArea } from './PostComment.style'
import PostCommentList from './PostCommentLists'

const PostComment = (props) => {
    const { idx, commentList, refreshFunction } = props
    const accessToken = useSelector((state: RootState) => state.token.token)
    const nickname = useSelector((state: RootState) => state.nickname.nickname)

    return (
        <CommentArea>
            <PostCommentList nickname={nickname} refreshFunction={refreshFunction} commentList={commentList} accessToken={accessToken} />
            <PostRootWrite refreshFunction={refreshFunction} accessToken={accessToken} idx={idx} nickname={nickname} />
        </CommentArea>
    )
}

export default PostComment
