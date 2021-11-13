import ErrorPage from "../../components/mock-pages/error/ErrorPage"

const IndexError = ({error = null}) => {
    return <ErrorPage title="Cannot load posts data" error={error} />
}

export default IndexError;