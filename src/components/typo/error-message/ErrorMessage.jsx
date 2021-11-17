const ErrorMessage = ({error}) => {
    console.log(error);
    return (
        <div className="box has-background-danger has-text-light">
                {
                    error
                }
        </div>
    )
}

export default ErrorMessage;