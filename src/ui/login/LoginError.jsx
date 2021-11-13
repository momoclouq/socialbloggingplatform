const LoginError = ({error = null}) => {
    return(
        <div className="box has-background-danger has-text-light">
            {
                error ? error : "Wrong username or password"
            }
        </div>
    )
}

export default LoginError;