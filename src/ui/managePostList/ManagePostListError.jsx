import ErrorPage from "../../components/mock-pages/error/ErrorPage"

const ManagePostListError = ({error = null}) => {
    return <ErrorPage title="Cannot load your posts" error={error} />
}

export default ManagePostListError;