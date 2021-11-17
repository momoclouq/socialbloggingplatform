const NormalLoader = ({message}) => {
    return(
        <div className="box">
            <div className="loader is-loading mb-5"></div>
            <div className="subtitle">{message}</div>
        </div>
    )
}

export default NormalLoader;