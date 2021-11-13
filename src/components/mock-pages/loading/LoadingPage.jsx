const LoadingPage = ({message}) => {
    return(
        <div className="container p-4 is-flex is-flex-direction-column is-align-items-center">
            <div className="loader is-loading mb-5"></div>
            <div className="subtitle">{message}</div>
        </div>
    )
}

export default LoadingPage;