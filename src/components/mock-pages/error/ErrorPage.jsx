const ErrorPage = ({title, error = null}) => {
    let output = "";

    if(Array.isArray(error)) output = error.map((err, index) => {
        return <div className="subtitle" key={index}>Detail: {err.msg} - for: {err.param}</div>
    })
    else output = error ? <div className="subtitle">Detail: {error}</div> : "";

    return (
        <div className="container p-4 p-4 is-flex is-flex-direction-column is-align-items-center">
            <div className="title mb-5">{title} <i className="fas fa-sad-tear"></i></div>
            { output }
        </div>
    )
}

export default ErrorPage;