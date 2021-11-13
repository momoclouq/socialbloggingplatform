import ErrorPage from "../../../components/mock-pages/error/ErrorPage"

const PostCommentError = ({error = null}) => {
    return <ErrorPage title="Cannot load the comments" error={error} />
}

export default PostCommentError;