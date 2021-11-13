import ErrorPage from "../../components/mock-pages/error/ErrorPage"

const PostListError = ({error = null}) => {
    return <ErrorPage title="Cannot load the post list" error={error} />
}

export default PostListError;