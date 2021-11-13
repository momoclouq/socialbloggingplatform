import ErrorPage from "../../components/mock-pages/error/ErrorPage";

const BloggerDetailError = ({error = null}) => {
    return <ErrorPage title="Cannot load the blogger information" error={error} />
}

export default BloggerDetailError;