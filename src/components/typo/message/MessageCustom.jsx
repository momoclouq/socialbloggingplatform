const MessageCustom = ({children}) => {
    return(
        <div className="message is-info mb-2 is-size-5">
            <div className="message-body">{children}</div>
        </div>
    )
}

export default MessageCustom;