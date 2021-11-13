const SignupError = ({error = null}) => {
    let output = "";

    if(Array.isArray(error)) output = error.map((err, index) => {
        return <li key={index}>{err.msg} - for: {err.param}</li>
    })
    else output = error ? <li>{error}</li> : "";

    return( 
        <div className="box content">
            <div className="title is-6 has-text-danger">Errors in creating</div>
            <ul>
                {output}
            </ul>
        </div>
    )
}

export default SignupError;