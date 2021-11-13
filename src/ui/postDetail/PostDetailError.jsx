import ErrorPage from "../../components/mock-pages/error/ErrorPage"

const PostDetailError = ({error = null}) => {
    return <ErrorPage title="Cannot load post detail" error={error} />
}

export default PostDetailError;