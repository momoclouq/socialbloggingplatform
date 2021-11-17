const AddNewButton = ({actionOnClick}) => {
    return(
        <button onClick={actionOnClick} className="button is-success is-medium is-outlined is-rounded">
            Create a new post
        </button>
    )
}

export default AddNewButton;