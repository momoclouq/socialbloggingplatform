import ErrorPage from "../../components/mock-pages/error/ErrorPage";

const BloggerListError = ({error = null}) => {
    return <ErrorPage title="Cannot Load the bloggers" error={error} />
}

export default BloggerListError;